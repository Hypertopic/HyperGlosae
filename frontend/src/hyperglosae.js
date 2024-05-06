import {Buffer} from 'buffer';

const service = 'http://localhost:5984/hyperglosae';

function Hyperglosae(logger) {

  this.credentials = {};

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

  let basicAuthentication = ({force}) => {
    let {name, password} = this.credentials;
    if (!force && !name && !password) return ({});
    return ({
      'Authorization': 'Basic ' + Buffer.from(`${name}:${password}`).toString('base64')
    });
  };

  this.putDocument = (doc) =>
    fetch(`${service}/${doc._id}`, {
      method: 'PUT',
      headers: basicAuthentication({force: false}),
      body: JSON.stringify(doc)
    })
      .then(x => x.json())
      .then(x => {
        if (x.reason) {
          logger(x.reason);
          throw new Error(x.reason);
        }
      });

  this.authenticate = ({name, password}) => {
    this.credentials = {name, password};
    return fetch(`${service}`, {
      method: 'GET',
      headers: basicAuthentication({force: true})
    })
      .then(x => x.json())
      .then(x => {
        if (x.reason) {
          this.credentials = {};
          logger(x.reason);
          throw new Error(x.reason);
        }
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
    this.getView({view: 'all_documents', options: ['group']})
      .then((rows) => {
        callback(
          rows.map(
            ({value}) => ({...value.metadata, referenced: value.referenced})
          )
        );
      });
  };

  this.getBookmark = (docId, userId) => {
    // Retrieves specified bookmark based on docId
    return this.getView({view: 'bookmark', id: userId, options: ['include_docs']})
      .then(rows => {
        const bookmark = rows.find(row => row.value === docId); // Assuming row.value.docId is the correct path
        return bookmark; // Return the found bookmark
      });
  };

  this.createBookmark = (docId, userId) => {
    const bookmarkDoc = {
      type: 'bookmark',
      docId,
      userId,
      createdAt: new Date().toISOString()
    };
    // Use POST to let CouchDB generate the _id
    return fetch(`${service}`, {
      method: 'POST',
      headers: {
        ...basicAuthentication({force: true}),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookmarkDoc)
    })
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          // Bookmark creation succeeded
          return data.id;
        }
      });
  };

  this.removeBookmark = (docId, userId) => {
    return this.getView({view: 'bookmark', id: userId, options: ['include_docs']})
      .then(rows => {
        // Find the bookmark for the specific document
        const bookmark = rows.find(row => row.value === docId);
        if (bookmark) {
          // Retrieve the full bookmark document to get its _rev
          return this.getDocument(bookmark.id);
        }
      })
      .then(bookmarkDoc => {
        if (bookmarkDoc && bookmarkDoc._id && bookmarkDoc._rev) {
          // Delete the bookmark document
          return fetch(`${service}/${bookmarkDoc._id}?rev=${bookmarkDoc._rev}`, {
            method: 'DELETE',
            headers: basicAuthentication({ force: true })
          }).then(res => res.json());
        }
      });
  };

  return this;
}

export default Hyperglosae;
