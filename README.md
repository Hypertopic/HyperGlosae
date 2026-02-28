# Hyperglosae: Human annotations for digital humanities

## Product vision

__For__ intellectual workers<br/>
__who__ interpret documents<br/>
Hyperglosae __is a__ digital margin<br/>
__that allows__ writing glosses (comments, adaptations or quotes) of these documents for future readers.

__Unlike__ *Hypothes.is*, *Google Docs*, *Hypotheses* (based on *WordPress*), *Zotero*, and *LiquidText*,<br/>
__our product allows__ glossing an author-defined "passage" (*i.e.* a meaningful unit, like a paragraph, a strophe, a verse...).

![Glossing an author-defined 'passage'](docs/screenshot_translator_passage.png "Glossing an author-defined 'passage'")

__Unlike__ *Hypotheses*,<br/>
__our product also allows__ commenting on a reader-defined "fragment".

![Commenting on a reader-defined 'fragment'](docs/screenshot_analysis_fragment.png "Commenting on a reader-defined 'fragment'")

__Unlike__  *Hypothes.is* and *Google Docs*,<br/>
fragments __may be__ defined on a picture.

![Fragments may be defined on a picture](docs/screenshot_historian_fragment.png "Fragments may be defined on a picture")

__Unlike__ all of the previously cited software,<br/>
fragments __may even be__ defined on a video.

![Fragments may be defined on a video](docs/screenshot_movie_fragment.png "Fragments may be defined on a video")


__Unlike__ *Hypothes.is*, *Google Docs*, and *Zotero*,<br/>
__our product allows__ glosses to be full-fledged documents and hence to be glossed as well.<br/>
__It allows__ navigating from gloss to gloss, or from source to source.

![Glosses are full-fledged documents and hence can be glossed as well](docs/screenshot_analysis_browsing.png "Glosses are full-fledged documents and hence can be glossed as well")
![Navigating from gloss to gloss, or from source to source](docs/screenshot_analysis_graph.png "Navigating from gloss to gloss, or from source to source")

## Project background

In the past decades, we designed *[Cassandre](https://hypertopic.org/cassandre)* for ethnographic studies and *[TraduXio](https://hypertopic.org/traduxio)* for translation studies. 
It appeared that both pieces of software were kind of implementations of "[parallel documents with a visible connection](https://www.youtube.com/watch?v=hMKy52Intac)" as envisioned by Theodor Nelson, who coined the term "hypertext".
We then figured out that a more general Nelsonian[^1] hypertext could be the missing infrastructure for "digital humanists".

[^1]: Disclaimer: We are not affiliated with Theodor Nelson. We are just fans ;)

Step by step, we will prototype such an infrastructure and test it on practices in social and human sciences.

## Requirements

HyperGlosae will be designed with environmental responsibility in mind (for example the number and weight of HTTP requests will be kept low).

## Architecture

Bidirectional links cannot be distributed as easily as unidirectional links.
If the frontend was the origin of every request (as on the Web), getting all bidirectional links to a given document would require every backend (that may store one) to be queried...
Instead, the original hypertext architecture was more like a federation of backends (a bit like Usenet).
A modern version of this (see figure below) will be achieved with CouchDB filtered replications.

![HyperGlosae architecture](./docs/architecture.png "Hypertext architecture, revisited from Nelson (1993:4/62) with current technologies (React and CouchDB).")

## Deliverables

The folders of the repository correspond to the main deliverables:

- `samples` of parallel documents, meaningful for stakeholders,
- `frontend` prototype for reading and writing parallel documents, along with `scenarios` as user-centered specifications,
- `backend` prototype for storing parallel documents.

## How to test a development version with sample data?

Run the following commands from a terminal (requires Docker and Node.js):

```shell
export COUCHDB_USER="TO_BE_CHANGED"
export COUCHDB_PASSWORD="TO_BE_CHANGED"
docker compose --file docker-compose.dev.yml up --detach
cd frontend && npm install
npm start
```

Open <http://localhost:3000> in a browser.
To test edit features, log in as user `alice` with `whiterabbit` as the password.

## How to install a clean stable version?

Run the following commands from a terminal (requires Docker):

```shell
export COUCHDB_USER="TO_BE_CHANGED"
export COUCHDB_PASSWORD="TO_BE_CHANGED"
docker compose up --detach
```

Open <http://localhost> in a browser.

