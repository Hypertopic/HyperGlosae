function (doc) {
  if (doc.dc_title) {
    emit([doc._id], {history: doc.history});
  } else if (doc.isPartOf) {
    emit([doc.isPartOf], {history : doc.history})
  }
}