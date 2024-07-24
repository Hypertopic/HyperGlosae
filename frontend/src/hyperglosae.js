import {Buffer} from 'buffer';

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

  this.putDocument = (doc) =>
    fetch(`${service}/${doc._id}`, {
      method: 'PUT',
      credentials: 'include',
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
      credentials: 'include'
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
      credentials: 'include'
    });

  this.putAttachment = (id, attachment, callback) =>
    this.getDocumentMetadata(id).then(x => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(attachment);
      reader.onload = () => {
        const arrayBuffer = reader.result;

        fetch(`${service}/${id}/${attachment.name}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'If-Match': x.headers.get('ETag'),
            'Content-Type': attachment.type
          },
          body: arrayBuffer
        }).then(response => callback(response));
      };
    });

  this.authenticate = ({name, password}) => {
    return fetch(`${service}/_session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `name=${name}&password=${password}`,
      credentials: 'include'
    })
      .then(x => x.json())
      .then(x => {
        if (x.error) {
          logger(x.reason);
          throw new Error(x.reason);
        }
        return x;
      });
  };

  this.logout = () => {
    return fetch(`${service}/_session`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(x => x.json())
      .then(x => {
        if (x.error) {
          logger(x.reason);
          throw new Error(x.reason);
        }
        return x;
      });
  };

  this.refreshMetadata = (id, callback) => {
    this.getView({view: 'metadata', id, options: ['include_docs']})
      .then(
        (rows) => {
          let documents = rows.map(x => x.doc);
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
    let id = 'PUBLIC';
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
