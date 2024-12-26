function ({_id, links = [], dc_title}) {
  const { parseReference } = require('views/lib/links');

  if (!dc_title) return;
  links.forEach(({subject, object}, i) => {
    let reference = parseReference((subject && subject !== _id) ? subject : object).id;
    emit([reference], {_id});
    emit([_id, i], {_id: reference});
  });
  emit([_id], {_id});
}
