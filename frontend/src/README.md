# Components structure

Hyperglosae frontend is composed of the following React components:

## Bookshelf

![screenshot](../../docs/component_bookshelf.png)

Source: [routes/Bookshelf.js](https://github.com/Hypertopic/HyperGlosae/blob/main/frontend/src/routes/Bookshelf.js)

Parts:

- Graph
- [FutureDocument](#futuredocument)


## Lectern

![screenshot](../../docs/component_lectern.png)
![screenshot](../../docs/component_lectern2.png)

Source: [routes/Lectern.js](https://github.com/Hypertopic/HyperGlosae/blob/main/frontend/src/routes/Lectern.js)

Parts:

- [DocumentsCards](#documentscards)
- [OpenedDocuments](#openeddocuments)

## DocumentsCards

<img src="../../docs/component_documentscards.png" width="15%" />
<img src="../../docs/component_documentscards2.png" width="40%" />

Source: [components/DocumentsCards.js](https://github.com/Hypertopic/HyperGlosae/blob/main/frontend/src/components/DocumentsCards.js)

Parts:

- [BrowseTools](#browsetools)
- [Metadata](#metadata)
- TypeBadge
- [FutureDocument](#futuredocument)

## OpenedDocuments

<img src="../../docs/component_openeddocuments.png" width="50%" />
<img src="../../docs/component_openeddocuments2.png" />

Source: [components/OpenedDocuments.js](https://github.com/Hypertopic/HyperGlosae/blob/main/frontend/src/components/OpenedDocuments.js)

Parts:

- [BrowseTools](#browsetools)
- [Metadata](#metadata)
- TypeBadge
- Type
- [Passage](#passage)

## BrowseTools

<img src="../../docs/component_browsetools.png" width="5%" />
<img src="../../docs/component_browsetools2.png" width="5%" />

Source: [components/BrowseTools.js](https://github.com/Hypertopic/HyperGlosae/blob/main/frontend/src/components/BrowseTools.js)

Parts: **none**

## Metadata

<img src="../../docs/component_metadata.png" width="10%" />
<img src="../../docs/component_metadata2.png" width="30%" />

Source: [components/Metadata.js](https://github.com/Hypertopic/HyperGlosae/blob/main/frontend/src/components/Metadata.js)

Parts: **none**

## FutureDocument

<img src="../../docs/component_futuredocument.png" width="20%" />
<img src="../../docs/component_futuredocument2.png" width="20%" />

Source: [components/FutureDocument.js](https://github.com/Hypertopic/HyperGlosae/blob/main/frontend/src/components/FutureDocument.js)

Parts: **none**


## Passage

<img src="../../docs/component_passage.png" width="60%" />
<img src="../../docs/component_passage2.png" />
<img src="../../docs/component_passage3.png" />

Source: [components/Passage.js](https://github.com/Hypertopic/HyperGlosae/blob/main/frontend/src/components/Passage.js)

Parts:

- [FormattedText](#formattedtext)
- [EditableText](#editabletext)

## FormattedText

Source: [components/FormattedText.js](https://github.com/Hypertopic/HyperGlosae/blob/main/frontend/src/components/FormattedText.js)

Parts:

- [EditableText](#editabletext)

## EditableText

Source: [components/EditableText.js](https://github.com/Hypertopic/HyperGlosae/blob/main/frontend/src/components/EditableText.js)

Parts:

- [CroppedImage](#croppedimage)
- [VideoComment](#videocomment)

## CroppedImage

Source: [components/CroppedImage.js](https://github.com/Hypertopic/HyperGlosae/blob/main/frontend/src/components/CroppedImage.js)

Parts: **none**

## VideoCommment

Source: [components/VideoComment.js](https://github.com/Hypertopic/HyperGlosae/blob/main/frontend/src/components/VideoComment.js)

Parts: **none**
