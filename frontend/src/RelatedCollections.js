import { DocumentCard } from './DocumentsCards';
import './RelatedCollections.css';
import './Page.css';

function getCurrentAndRelatedCollections(
  currentCollectionId,
  relatedDocumentsMetadata
) {
  if (relatedDocumentsMetadata.length === 0) {
    return { currentCollection: undefined, relatedCollections: [] };
  }
  const relatedCollections = [];
  let currentCollection = undefined;

  relatedDocumentsMetadata.forEach((doc) => {
    if (currentCollectionId && doc._id === currentCollectionId) {
      currentCollection = doc;
      return;
    }
    if (
      doc.links &&
      doc.links.find((link) => {
        return link.verb === 'includes';
      })
    ) {
      relatedCollections.push(doc);
    }
  });

  return { currentCollection, relatedCollections };
}

export default function DisplayRelatedCollections({
  relatedDocumentsMetadata,
  currentCollectionId,
}) {
  const { currentCollection, relatedCollections } =
    getCurrentAndRelatedCollections(
      currentCollectionId,
      relatedDocumentsMetadata
    );

  if (!currentCollection && relatedCollections.length === 0) {
    return;
  }

  return (
    <div className="gy-4 related-collections-displayer">
      {currentCollection && (
        <div className="current-collection">
          <h5>Parcours Actuel :</h5>

          <DocumentCard
            doc={currentCollection}
            expandable={false}
          />

        </div>
      )}
      {relatedCollections.length !== 0 && (
        <div className="related-collections">
          <h5>Autres parcours liés :</h5>
          {relatedCollections.map((collection, i) => {
            return (

              <DocumentCard
                key={i}
                doc={collection}
                expandable={false}
              />

            );
          })}
        </div>
      )}
    </div>
  );
}
