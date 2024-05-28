function (doc) {
  if (doc.bookmark) {
    emit([doc.editors[0], doc.bookmark]);
  }
}
