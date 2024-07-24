import '../styles/PassageSourceMenu.css';

import { Dropdown } from 'react-bootstrap';
import { forwardRef } from 'react';
import { ThreeDotsVertical } from 'react-bootstrap-icons';

function PassageSourceMenu({ handleAddQuotation }) {
  return (
    <Dropdown className="float-end more-btn">
      <Dropdown.Toggle as={BlockMenuButton} />
      <Dropdown.Menu id="block-actions">
        <Dropdown.Item as="button" onClick={handleAddQuotation} className="dropdown-item-share">Add a Quotation</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

const BlockMenuButton = forwardRef(({ children, onClick }, ref) => (
  <ThreeDotsVertical
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    ref={ref} className="editable-button">
    {children}
  </ThreeDotsVertical>
));

export default PassageSourceMenu;