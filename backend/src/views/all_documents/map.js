function (metadata) {

  if (!metadata.dc_title) return;

  const editors = metadata.editors || ['PUBLIC'];
  editors.forEach(editor => {
    emit([editor, metadata._id], { metadata });
  });

}
