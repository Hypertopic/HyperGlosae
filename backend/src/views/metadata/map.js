function ({_id, links = [], dc_title}) {
  if (!dc_title) return;
  links.forEach(({subject, object}, i) => {
    let reference = (subject && subject !== _id) ? subject : object;
    emit([reference], {_id});
    emit([_id, i], {_id: reference});
  });
  emit([_id], {_id});
}
