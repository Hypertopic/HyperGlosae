import '../styles/FragmentComment.css';

function FragmentComment({ children, setHighlightedText }) {
  try {
    const citationRegex = /^\[.*\]\s*\n(.*)$/m;
    if (citationRegex.test(children)) {
      let [citation, comment] = children[0].split(/\n/);
      citation = citation.replace(/[\[\]]/g, '');
      return <p
        onMouseEnter={
          e => {
            e.preventDefault();
            e.stopPropagation();
            setHighlightedText(citation);
          }
        }
        onMouseLeave={
          e => {
            e.preventDefault();
            e.stopPropagation();
            setHighlightedText('');
          }
        }
        className="fragmentComment"
        title="Highlight in document"
      >{comment}</p>;
    }
  } catch (e) {
    console.error(e);
  }
}

export default FragmentComment;
