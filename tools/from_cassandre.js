const ORIGIN = 'http://localhost:5984/cassandre';
const ORIGIN_CREDENTIALS = 'TO_BE_CHANGED:TO_BE_CHANGED';
const DESTINATION = 'http://localhost:5984/hyperglosae';
const DESTINATION_CREDENTIALS = 'TO_BE_CHANGED:TO_BE_CHANGED';
const DIARY = '27a9c19269be863f31acd74d740cd8c0';
const EDITORS = ['margaux.coeuret@utt.fr', 'benel'];

const postJSON = (uri, credentials, object) =>
  fetch(uri, {
    method: 'POST',
    body: JSON.stringify(object),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(credentials)}`,
    },
  })
  .then(x => x.json());

const convertToLink = (grounding) => ({
  verb: 'refersTo',
  object: grounding._id || grounding
});

const addUserOnce = (users, {user}) =>
  users.includes(user) ? users : [...users, user];

const convertMemo = 
  ({
    _id,
    name,
    body,
    statement,
    type,
    groundings = [],
    history = []
  }) => ({
    _id,
    dc_title: name,
    text: body || statement,
    type,
    links: [...new Set(groundings.map(convertToLink))],
    dc_creator: history.reduce(addUserOnce, []),
    dc_issued: history[0]?.date,
    editors: EDITORS,
  });

postJSON(`${ORIGIN}/_find`, ORIGIN_CREDENTIALS, {
  selector: {
    diary: {
      $eq: DIARY
    }
  },
  limit: 1000,
})
  .then(({docs}) => docs.map(convertMemo))
  .then(docs =>
    postJSON(`${DESTINATION}/_bulk_docs`, DESTINATION_CREDENTIALS, ({
      docs,
    }))
  )
  .then(console.log);

