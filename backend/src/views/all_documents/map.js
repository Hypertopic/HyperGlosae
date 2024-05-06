function (metadata) {
  const { parseReference } = require('views/lib/links');

  if (!metadata.dc_title) return;

  const editors = metadata.editors || ['PUBLIC'];

  // Handle links and emit the reference count for each document linked
  (metadata.links || []).forEach(({object}) => {
    const refId = parseReference(object).id;
    editors.forEach(editor => {
      emit([editor, refId], { referenced: 1 });
    });
  });

  // Emit the document for each editor, or under 'null' if no editors
  editors.forEach(editor => {
    emit([editor, metadata._id], { metadata, referenced: 0 });
  });

}
