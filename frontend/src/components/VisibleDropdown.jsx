import '../styles/DiscreeteDropdown.css';

import { Dropdown } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';

function VisibleDropdown({children}) {

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" size="sm" className="no-caret top-right toggle">
        <List />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {children}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default VisibleDropdown;

