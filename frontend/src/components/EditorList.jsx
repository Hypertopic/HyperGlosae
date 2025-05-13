import { useState } from 'react';
import { Form } from 'react-bootstrap';

function EditorList({ availableEditors, selectedEditors, setSelectedEditors }) {
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);

  const handleSelectAll = () => {
    const newSelectAllState = !isSelectAllChecked;
    setIsSelectAllChecked(newSelectAllState);
    const updatedSelectedEditors = newSelectAllState ? [...availableEditors] : [];
    setSelectedEditors(updatedSelectedEditors);
  };

  const handleEditorChange = (editor) => {
    let updatedSelectedEditors;

    if (selectedEditors.includes(editor)) {
      updatedSelectedEditors = selectedEditors.filter((e) => e !== editor);
    } else {
      updatedSelectedEditors = [...selectedEditors, editor];
    }

    updatedSelectedEditors = availableEditors.filter((e) =>
      updatedSelectedEditors.includes(e)
    );

    setSelectedEditors(updatedSelectedEditors);
    setIsSelectAllChecked(updatedSelectedEditors.length === availableEditors.length);
  };

  return (
    <div>
      {availableEditors.length > 1 && (
        <Form.Check
          id="select-all"
          label={<strong>All</strong>}
          checked={isSelectAllChecked}
          onChange={handleSelectAll}
        />
      )}
      {availableEditors.map((editor) => (
        <Form.Check key={editor}
          id={`editor-${editor}`}
          label={editor}
          checked={selectedEditors.includes(editor)}
          onChange={() => handleEditorChange(editor)}
        />
      ))}
    </div>
  );
};

export default EditorList;
