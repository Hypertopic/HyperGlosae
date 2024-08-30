import '../styles/DiscreeteDropdown.css';

import { forwardRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ThreeDotsVertical } from 'react-bootstrap-icons';

function DiscreeteDropdown({children}) {

  const Toggle = forwardRef(({onClick}, ref) => (
    <ThreeDotsVertical className="toggle" {...{onClick, ref}} />
  ));
  Toggle.displayName = 'Toggle';

  return (
    <Dropdown className="position-absolute top-0 end-0">
      <Dropdown.Toggle as={Toggle} />
      <Dropdown.Menu>
        {children}
      </Dropdown.Menu>
    </Dropdown>
  );
}

DiscreeteDropdown.Item = Dropdown.Item;

export default DiscreeteDropdown;

