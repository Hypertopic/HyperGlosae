function Context(id, metadata) {
  metadata = metadata || [];

  this.getDocument = (x) => metadata.find(y => (y._id === x)) || {};

  this.focusedDocument = this.getDocument(id);

  const forwardLinks = (this.focusedDocument.links || [])
    .map(({subject, object}) => (subject && (subject !== id)) ? subject : object)
    .map(x => x.split('#')[0]);

  this.forwardLinkedDocuments = metadata.filter(
    x => forwardLinks.includes(x._id)
  );

  this.reverseLinkedDocuments = metadata.filter(
    x => !forwardLinks.includes(x._id) && x._id !== id
  );

  return this;
}

export default Context;
