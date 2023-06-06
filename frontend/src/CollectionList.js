import {FolderPlus} from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import {useState} from 'react';
import CollectionButton from './CollectionButton';
import FutureCollection from './FutureCollection';

function CollectionList({relatedTo, setLastUpdate, backend, collections}) {
  const [showList, setShowList] = useState(false);

  let handleShowList = async () => {
    setShowList(!showList);
  };

  return (
    <div>
      <Card className="h-100">
        <Card.Body className="text-center">
          <FolderPlus
            className="icon addCollection" onClick={handleShowList}
          />
        </Card.Body>
      </Card>
      {showList && (
        <span>
          <FutureCollection relatedTo={relatedTo} {...{setLastUpdate, backend}} />
          {collections.map(collection =>
            <CollectionButton
              key={collection.id}
              relatedTo={relatedTo}
              collection={collection}
              setShowList={setShowList}
              {...{setLastUpdate, backend}}
            />
          )}
        </span>
      )}
    </div>
  );
}

export default CollectionList;
