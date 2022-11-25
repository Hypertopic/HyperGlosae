function ({_id, text = '', links = [], isPartOf = _id}) {
  let related =  new Set(
    links.reduce((l, {object, subject}) => [...l, subject, object], [])
      .filter(x => !!x)
  ).add(isPartOf);
  const PASSAGE = /{(.+)} ([^{]+)/g;
  [...text.matchAll(PASSAGE)].forEach(([_, rubric, passage]) => {
 	  related.forEach(x => {
 	    emit([x, Number(rubric)], {text: passage, isPartOf});
 	  });
  });
}
