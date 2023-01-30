# HyperGlosae: A Nelsonian[^1] hypertext infrastructure for digital humanities

## Vision

[Hypertexts as envisioned by Theodor Nelson in the 1960's](https://www.youtube.com/watch?v=hMKy52Intac) are "needed more than ever", hypertexts with links that can be:

- followed both ways (e.g. from a comment to the original and from the original to comments),
- created freely by any reader (without validation by the author or the organization hosting the original document),
- used to read linked documents side by side, with related fragments in parallel,
- used to quote, explain, translate an existing document or fragment in a new one, or to compare two existing documents.

Because of the Web scale and because of the gap between Web usage and the tradition of Humanities that inspired Theodor Nelson, rebuilding the Web on these bases are probably out of reach for most of people and organizations.
However, existing communities of "humanists" share the same epistemological and methodological tradition.
We think they are both willing and able to adopt such an infrastructure.

[^1]: Disclaimer: We are not affiliated with Theodor Nelson. We are just fans ;)

## Scope

Step by step, we will prototype such an infrastructure and will test it on prior documented practices of "parallel documents" in our existing Hypertopic software suite (esp. [TraduXio](https://hypertopic.org/traduxio) and [Cassandre](https://hypertopic.org/cassandre)).

## Requirements

HyperGlosae will be designed with environmental responsibility in mind (for example the number and weight of HTTP requests will be kept low).

## Architecture

Bidirectional links cannot be distributed as easily as unidirectional links.
If the frontend was the origin of every request (as on the Web), getting all bidirectional links to a given document would require every backend (that may store one) to be queried...
Instead, the original hypertext architecture was more like a federation of backends (a bit like Usenet).
A modern version of this (see figure below) will be achieved with CouchDB filtered replications.

![HyperGlosae architecture](./docs/architecture.png "Hypertext architecture, revisited from Nelson (1993:4/62) with current technologies (React and CouchDB).")

## Deliverables

The folders of the repository will correspond to the main deliverables:

- `samples` of parallel documents, meaningful for stakeholders of our existing software,
- `features` specification through usage scenarios,
- `frontend` prototype for reading and writing parallel documents (see instructions for [testing it](./frontend/CONTRIBUTING.md)),
- `backend` prototype for storing parallel documents (see instructions for [testing it](./backend/CONTRIBUTING.md)),
- `library` of reusable parts to be integrated in other frontends.
