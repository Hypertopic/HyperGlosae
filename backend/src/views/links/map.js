function (doc) {
  let { _id, text = '', links = [], isPartOf = _id } = doc;
  let metadata = Object.fromEntries(
    Object.entries(doc)
      .filter(x => x[0].startsWith('dc_'))
  );
  let related =  new Set(
    links.reduce((l, {object, subject}) => [...l, subject, object], [])
      .filter(x => !!x)
  ).add(isPartOf);
  if (Object.keys(metadata).length) {
    related.forEach(x => {
      emit([x, 0], Object.assign({id: isPartOf}, metadata));
    });
  }
  const PASSAGE = /{(.+)} ([^{]+)/g;
  [...text.matchAll(PASSAGE)].forEach(([_, rubric, passage]) => {
 	  related.forEach(x => {
 	    emit([x, Number(rubric)], {text: passage, isPartOf});
 	  });
  });
}
