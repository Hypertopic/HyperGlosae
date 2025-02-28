const service = '/api';

function Hyperglosae(logger) {

  this.getView = ({view, id, options = []}) =>
    fetch(`${
      service
    }/_design/app/_view/${
      view
    }?${
      id ? `startkey=["${id}"]&endkey=["${id}",{}]` : ''
    }&${
      options.map(x => x + '=true').join('&')
    }`)
      .then(x => x.json())
      .then(x => x.rows);

  this.getDocument = (id) =>
    fetch(`${service}/${id}`)
      .then(x => x.json());

  this.putDocument = (doc, uri) =>
    fetch(`${service}/${uri || doc._id}`, {
      method: 'PUT',
      body: JSON.stringify(doc)
    })
      .then(x => x.json())
      .then(x => {
        if (x.reason) {
          logger(x.reason);
          throw new Error(x.reason);
        }
        return x;
      });

  this.deleteDocument = ({_id, _rev}) =>
    fetch(`${service}/${_id}?rev=${_rev}`, {
      method: 'DELETE',
    })
      .then(x => x.json())
      .then(x => {
        if (x.reason) {
          logger(x.reason);
          throw new Error(x.reason);
        }
        return x;
      });

  this.getDocumentMetadata = (id) =>
    fetch(`${service}/${id}`, {
      method: 'HEAD',
    });

  this.putAttachment = (id, attachment, callback) =>
    this.getDocumentMetadata(id).then(x => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(attachment);
      reader.onload = () => {
        const arrayBuffer = reader.result;

        fetch(`${service}/${id}/${attachment.name}`, {
          method: 'PUT',
          headers: {
            // ETag is the header that carries the current rev.
            'If-Match': x.headers.get('ETag'),
            'Content-Type': attachment.type
          },
          body: arrayBuffer
        }).then(response => callback(response));
      };
    });

  this.getSession = () =>
    fetch(`${service}/_session`)
      .then(x => x.json())
      .then(x => {
        this.user = x.userCtx?.name;
        return this.user;
      });

  this.postSession = ({name, password}) =>
    fetch(`${service}/_session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `name=${name}&password=${password}`
    })
      .then(x => x.json())
      .then(x => {
        if (!x.reason) return this.user = name;
        logger(x.reason);
      });

  this.deleteSession = () => {
    fetch(`${service}/_session`, {
      method: 'DELETE'
    })
      .then(() => {
        this.user = null;
      });
  };

  this.refreshMetadata = (id, callback) => {
    this.getView({view: 'metadata', id, options: ['include_docs']})
      .then(
        (rows) => {
          let documents = rows.map(x => x.doc).filter(x => x);
          callback(documents);
        }
      );
  };

  this.refreshContent = (id, callback) => {
    this.getView({view: 'content', id, options: ['include_docs']})
      .then(
        (rows) => {
          callback(rows);
        },
        (error) => {
          console.log(error.message);
        }
      );
  };

  this.refreshDocuments = (callback) => {
    let id = this.user || 'PUBLIC';
    this.getView({view: 'all_documents', id, options: ['include_docs']})
      .then((rows) => {
        callback(
          rows.map(x => x.doc)
        );
      });
  };

  return this;
}

export default Hyperglosae;
