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
  const PASSAGE = /{([^{]+)} ([^{]*)/g;
  let passages = [...text.matchAll(PASSAGE)];
  passages = (passages.length) ? passages : [[null, null, text]];
  passages.forEach(([_, rubric, passage]) => {
    let rubric_part;
    if (rubric) {
      rubric_part = rubric.match(/(?:(\d+)[:\.,])?(\d+)([a-z]?)/);
      if (rubric_part && rubric_part.length > 0) {
        rubric_part = rubric_part.slice(2).map((x) => Number(x) || x);
        if (rubric_part.includes("")) rubric_part = Number(rubric);
      }
    } else {
      rubric_part = Number(rubric);
    }
    related.forEach((x) => {
      emit([x, rubric_part], { text: passage, isPartOf, _id: null });
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
