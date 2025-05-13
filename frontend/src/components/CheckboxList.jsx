import { useState } from 'react';
import { Form } from 'react-bootstrap';

function CheckboxList({ availableItems, selectedItems, setSelectedItems, type}) {
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);

  const handleSelectAll = () => {
    const newSelectAllState = !isSelectAllChecked;
    setIsSelectAllChecked(newSelectAllState);
    const updatedSelectedItems = newSelectAllState ? [...availableItems] : [];
    setSelectedItems(updatedSelectedItems);
  };

  const handleItemChange = (item) => {
    let updatedSelectedItems;

    if (selectedItems.includes(item)) {
      updatedSelectedItems = selectedItems.filter((i) => i !== item);
    } else {
      updatedSelectedItems = [...selectedItems, item];
    }

    updatedSelectedItems = availableItems.filter((i) =>
      updatedSelectedItems.includes(i)
    );

    setSelectedItems(updatedSelectedItems);
    setIsSelectAllChecked(updatedSelectedItems.length === availableItems.length);
  };

  return (
    <div>
      {availableItems.length > 1 && (
        <Form.Check
          id={`select-all-${type}`}
          label={<strong>All</strong>}
          checked={isSelectAllChecked}
          onChange={handleSelectAll}
        />
      )}
      {availableItems.map((item) => (
        <Form.Check
          key={type === 'metadata' ? `${item[0]}-${item[1]}` : item}
          id={`${type}-${type === 'metadata' ? `${item[0]}` : item}`}
          label={
            <span className="checkbox-label">
              {type === 'metadata' ? `${item[0]}: ${item[1]}` : item}
            </span>
          }
          checked={selectedItems.includes(item)}
          onChange={() => handleItemChange(item)}
        />
      ))}
    </div>
  );
};

export default CheckboxList;
