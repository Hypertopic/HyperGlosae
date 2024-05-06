function (doc) {
  if (doc.type === 'bookmark') {
    emit([doc.userId], doc.docId);
  }
}