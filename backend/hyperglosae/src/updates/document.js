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
    if (!doc.history) doc.history = [];
    doc.history.push({
      user: req.userCtx.name,
      date: new Date().toISOString(),
      action: 'modification',
    });
  }
  return [doc, { json: { status: 'ok' } }];
}
