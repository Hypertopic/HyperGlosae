import '../styles/PassageMarginMenu.css';

import { forwardRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ThreeDotsVertical } from 'react-bootstrap-icons';

function PassageSourceMenu({selectedText, setSelectedText, setFragment}) {

  const handleClick = () => {
    setFragment(`[${selectedText}]\n`);
    setSelectedText();
  };

  const Toggle = forwardRef(({onClick}, ref) => (
    <ThreeDotsVertical className="toggle" {...{onClick, ref}} />
  ));
  Toggle.displayName = 'Toggle';

  return (
    <Dropdown className="position-absolute top-0 end-0">
      <Dropdown.Toggle as={Toggle} />
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleClick}>
          Comment the selected text...
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default PassageSourceMenu;

