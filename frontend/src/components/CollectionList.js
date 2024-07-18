import {FolderPlus} from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import {useState} from 'react';
import ExistingCollection from './ExistingCollection';
import FutureCollection from './FutureCollection';

function CollectionList({relatedTo, setLastUpdate, backend, collections}) {
  const [showList, setShowList] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleShowList = () => {
    setShowList(!showList);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCollections = collections.filter(collection =>
    collection.value.dc_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div>
          <Card className="h-100">
            <Card.Body>
              <input
                type="text"
                placeholder="Search collections"
                value={searchQuery}
                onChange={handleSearchChange}
                className="form-control"
              />
            </Card.Body>
          </Card>
          <FutureCollection relatedTo={relatedTo} {...{setLastUpdate, backend}} />
          {filteredCollections.map(collection => (
            <ExistingCollection
              key={collection.id}
              relatedTo={relatedTo}
              collection={collection}
              setShowList={setShowList}
              {...{setLastUpdate, backend}}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CollectionList;
