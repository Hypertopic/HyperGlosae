import '../styles/FragmentComment.css';

function FragmentComment({ children, setHighlightedText }) {
  try {
    children = (children instanceof Array) ? children : [children];
    const textContent = getTextContent(children);
    const citationRegex = /^\[.*\]\s*\n(.*)$/m;

    if (citationRegex.test(textContent)) {
      const { citationElements, commentElements, plainCitation } = splitCitationAndComment(children);

      const commentParts = commentElements.map((part, index) => (
        <span key={index}>{part}</span>
      ));

      return <p
        onMouseEnter={e => {
          e.preventDefault();
          e.stopPropagation();
          setHighlightedText(plainCitation);
        }}
        onMouseLeave={e => {
          e.preventDefault();
          e.stopPropagation();
          setHighlightedText('');
        }}
        className="fragment"
      >
        <span className="citation">{citationElements}</span>
        {commentParts}
      </p>;
    }
  } catch (e) {
    console.error(e);
  }
}

function getTextContent(element) {
  if (typeof element === 'string') return element;
  if (Array.isArray(element)) return element.map(getTextContent).join('');
  if (element?.props?.children) return getTextContent(element.props.children);
  return '';
}

function splitCitationAndComment(children) {
  const citationElements = [];
  const commentElements = [];
  let mode = 'before';
  let plainCitation = '';

  for (const child of children) {
    const text = getTextContent(child);

    if (mode === 'before') {
      if (text.includes('[')) {
        mode = 'citation';
        if (typeof child === 'string') {
          const afterBracket = child.split('[')[1];
          if (afterBracket) {
            if (afterBracket.includes(']')) {
              const betweenBrackets = afterBracket.split(']')[0];
              citationElements.push(betweenBrackets);
              plainCitation += betweenBrackets;
              const afterClosing = afterBracket.split(']').slice(1).join(']');
              if (afterClosing) {
                const commentText = afterClosing.replace(/^\n/, '');
                if (commentText) commentElements.push(commentText);
              }
              mode = 'comment';
            } else {
              citationElements.push(afterBracket);
              plainCitation += afterBracket;
            }
          }
        }
      }
      continue;
    }

    if (mode === 'citation') {
      if (text.includes(']')) {
        mode = 'comment';
        if (typeof child === 'string') {
          const beforeBracket = child.split(']')[0];
          if (beforeBracket) {
            citationElements.push(beforeBracket);
            plainCitation += beforeBracket;
          }
          const afterBracket = child.split(']').slice(1).join(']');
          if (afterBracket) {
            const commentText = afterBracket.replace(/^\n/, '');
            if (commentText) commentElements.push(commentText);
          }
        } else {
          citationElements.push(child);
          plainCitation += text;
        }
      } else {
        citationElements.push(child);
        plainCitation += text;
      }
      continue;
    }

    if (mode === 'comment') {
      commentElements.push(child);
    }
  }

  return { citationElements, commentElements, plainCitation: plainCitation.trim() };
}

export default FragmentComment;
