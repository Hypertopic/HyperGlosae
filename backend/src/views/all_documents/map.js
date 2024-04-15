function (doc) {
  const { parseReference } = require('views/lib/links');

  // Continue only if the document has a title
  if (!doc.dc_title) return;

  // Emit the document for each editor, or under 'null' if no editors
  const editors = doc.editors && doc.editors.length > 0 ? doc.editors : ['null'];
  editors.forEach(editor => {
    emit([editor, doc._id], { metadata: doc, referenced: 0 });
  });

  // Handle links and emit the reference count for each document linked
  (doc.links || []).forEach(link => {
    const refId = parseReference(link.object).id;
    editors.forEach(editor => {
      emit([editor, refId], { referenced: 1 });
    });
  });
}
