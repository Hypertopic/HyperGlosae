const service = 'http://localhost:5984/hyperglosae';

let getView = ({view, id, options = []}) =>
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

let getDocument = (id) =>
  fetch(`${service}/${id}`)
    .then(x => x.json());

let putDocument = (doc) =>
  fetch(`${service}/${doc._id}`, {
    method: 'PUT',
    body: JSON.stringify(doc)
  })
    .then(x => {
      if (x.ok) {
        return x.json();
      }
      throw new Error(x.statusText);
    });

export default {service, getView, getDocument, putDocument};
