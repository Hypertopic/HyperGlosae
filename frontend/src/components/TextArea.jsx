function TextArea({value, onChange, onBlur}) {
  return (
    <>
      <textarea className="form-control" type="text" rows="5" autoFocus
        {...{value, onChange, onBlur}}
      />
      <button
        type="button"
        className="btn btn-secondary btn-sm mt-1"
        onMouseDown={(e) => e.preventDefault()}
        onClick={onBlur}
      >
        Save
      </button>
    </>
  );
}

export default TextArea;

