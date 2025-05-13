function(doc, req) {
  const body = JSON.parse(req.body, (k, v) => (k === 'history') ? undefined : v);
  if (!doc) {
    doc = Object.assign({}, body, {
      _id: req.id,
      _rev: req.rev,
      history: [{
        user: req.userCtx.name,
        date: new Date().toISOString(),
        action: 'creation',
      }],
    });
  } else {
    doc = Object.assign({}, doc, body);
  }
  return [doc, { json: { status: 'ok' } }];
}
