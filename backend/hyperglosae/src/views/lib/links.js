exports.parseReference = parseReference = (reference) => {
  let [id, fragment] = reference.split('#');
  return {id, fragment};
}

// Note: The result set includes also the document itself or its main document
exports.getRelatedDocuments = ({isPartOf, links}) =>
  new Set(
    links.reduce((l, {object, subject}) => [...l, subject, object], [])
      .filter(x => !!x)
      .concat(isPartOf)
      .map(x => parseReference(x).id)
  );

exports.emitPassages = ({text, isPartOf, related}) => {
  if (!text) return;
  const PASSAGE = /{([^{]+)} ([^{]*)/g;
  let passages = [...text.matchAll(PASSAGE)];
  passages = (passages.length) ? passages : [[null, '0', text]];
  passages.forEach(([_, rubric, passage]) => {
    let parsed_rubric = rubric.match(/(?:(\d+)[:\., ])?(\d+) ?([a-z]?)/)
        .slice(1)
        .filter(x => !!x)
        .map(x => {
          let n = Number(x) ;
          return Number.isNaN(n) ? x : n;
        });
    related.forEach((x) => {
      emit([x, ...parsed_rubric], { text: passage, isPartOf, rubric, _id: null });
 	  });
  });
}

exports.emitIncludedDocuments = ({isPartOf, links}) => {
  let includedDocuments = links
    .filter(x => x.verb === 'includes')
    .map(x => parseReference(x.object));
  includedDocuments.forEach((x, i) => {
    emit([isPartOf, i], {inclusion: x.fragment || 'whole', isPartOf, _id: x.id});
    includedDocuments.forEach((y, j) => {
      emit([x.id, j], {inclusion: y.fragment || 'whole', isPartOf, _id: y.id});
    });
  });
}
