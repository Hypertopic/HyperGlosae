import '../styles/FragmentComment.css';
import React from 'react';
import { highlightTextInMainDocument, unHighlightAllTextInMainDocument } from './utils';

function FragmentComment({ children }) {
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
            highlightTextInMainDocument(citation);
          }
        }
        onMouseLeave={
          e => {
            e.preventDefault();
            e.stopPropagation();
            unHighlightAllTextInMainDocument();
          }
        }
        className="fragmentComment"
        title="Highlight in document"
      >{comment}</p>;
    }
  } catch (e) {}

}

export default FragmentComment;
