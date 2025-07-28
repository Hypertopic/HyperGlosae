import '../styles/FragmentComment.css';

function FragmentComment({ children, setHighlightedText }) {
  try {
    const citationRegex = /^\[.*\]\s*\n(.*)$/m;
    if (citationRegex.test(children[0])) {
      let [citation, comment] = children[0].split(/\n/);
      citation = citation.replace(/[[\]]/g, '');
      const commentParts = [
        comment,
        ...children.slice(1)
      ].map((part, index) => (
        <span key={index}>
          {part}
        </span>
      ));

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
        className="fragment"
      >
        <span className="citation">{citation}</span>
        {commentParts}
      </p>;
    }
  } catch (e) {
    console.error(e);
  }
}

export default FragmentComment;
