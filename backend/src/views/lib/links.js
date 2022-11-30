exports.getMetadata = (doc) =>
  Object.fromEntries(
    Object.entries(doc)
      .filter(x => x[0].startsWith('dc_'))
  );

// Note: The result set includes also the document itself or its main document
exports.getRelatedDocuments = ({_id, isPartOf, links = []}) =>
  new Set(
    links.reduce((l, {object, subject}) => [...l, subject, object], [])
      .filter(x => !!x)
      .concat(isPartOf || _id)
  );

exports.emitMetadata = ({metadata, id, related}) => {
  if (Object.keys(metadata).length) {
    related.forEach(x => {
      emit([x, 0], Object.assign({id}, metadata));
    });
  }
}

exports.emitPassages = ({text, isPartOf, related}) => {
  const PASSAGE = /{(.+)} ([^{]+)/g;
  [...text.matchAll(PASSAGE)].forEach(([_, rubric, passage]) => {
 	  related.forEach(x => {
 	    emit([x, Number(rubric)], {text: passage, isPartOf});
 	  });
  });
}
