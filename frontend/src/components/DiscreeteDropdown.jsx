import '../styles/DiscreeteDropdown.css';

import { forwardRef } from 'react';
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ThreeDotsVertical } from 'react-bootstrap-icons';

function DiscreeteDropdown({children}) {

  const Toggle = forwardRef(({onClick}, ref) => (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="tooltip-edit-metadata">Edit metadata...</Tooltip>}
    >
      <ThreeDotsVertical className="toggle" {...{onClick, ref}} />
    </OverlayTrigger>
  ));
  Toggle.displayName = 'Toggle';

  return (
    <Dropdown className="discreete-dropdown position-absolute top-0 end-0">
      <Dropdown.Toggle as={Toggle} />
      <Dropdown.Menu>
        {children}
      </Dropdown.Menu>
    </Dropdown>
  );
}

DiscreeteDropdown.Item = Dropdown.Item;

export default DiscreeteDropdown;

