function(doc, req) {
  if (!doc) return [null, { json: { error: 'not_found' } }];
  const body = JSON.parse(req.body);
  if (body.beingEditedBy) {
    doc.beingEditedBy = body.beingEditedBy;
  } else {
    delete doc.beingEditedBy;
  }
  return [doc, { json: { status: 'ok' } }];
}