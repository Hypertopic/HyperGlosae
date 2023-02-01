const service = 'http://localhost:5984/hyperglosae/_design/app';

let getView = ({view, id, options = []}) =>
    fetch(`${
      service
    }/_view/${
      view
    }?${
      id ? `startkey=["${id}"]&endkey=["${id}",{}]` : ''
    }&${
      options.map(x => x + '=true').join('&')
    }`)
      .then(x => x.json())
      .then(x => x.rows);

export default {service, getView};
