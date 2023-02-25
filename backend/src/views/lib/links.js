// Note: The result set includes also the document itself or its main document
exports.getRelatedDocuments = ({isPartOf, links}) =>
  new Set(
    links.reduce((l, {object, subject}) => [...l, subject, object], [])
      .filter(x => !!x)
      .concat(isPartOf)
  );

exports.emitPassages = ({text, isPartOf, related}) => {
  const PASSAGE = /{(.+)} ([^{]+)/g;
  let passages = [...text.matchAll(PASSAGE)];
  passages = (passages.length || !text) ? passages : [[null, null, text]];
  passages.forEach(([_, rubric, passage]) => {
 	  related.forEach(x => {
 	    emit([x, Number(rubric)], {text: passage, isPartOf, _id: null});
 	  });
  });
}

exports.emitIncludedDocuments = ({isPartOf, links}) => {
  let includedDocuments = links
    .filter(x => x.verb === 'includes')
    .map(x => x.object);
  includedDocuments.forEach((x, i) => {
    emit([isPartOf, i], {inclusion: 'whole', isPartOf, _id: x});
    includedDocuments.forEach((y, j) => {
      emit([x, i], {inclusion: 'whole', isPartOf, _id: y});
    });
  });
}
