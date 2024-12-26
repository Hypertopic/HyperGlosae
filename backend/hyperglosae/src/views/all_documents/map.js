function (metadata) {

  if (metadata.bookmark) {
    emit([metadata.editors[0], metadata.bookmark], {_id: metadata.bookmark});
    return;
  }

  if (!metadata.dc_title) return;

  const editors = metadata.editors || ['PUBLIC'];
  editors.forEach(editor => {
    emit([editor, metadata._id]);
  });

}
