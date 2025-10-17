import { useRef, useEffect } from 'react';

function CrossElementHighlighter({ children, highlightText }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const highlights = containerRef.current.querySelectorAll('mark');
    highlights.forEach(mark => {
      const parent = mark.parentNode;
      while (mark.firstChild) {
        parent.insertBefore(mark.firstChild, mark);
      }
      parent.removeChild(mark);
      parent.normalize();
    });

    if (!highlightText) return;

    const textNodes = [];
    const walker = document.createTreeWalker(
      containerRef.current,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          if (node.textContent.trim() === '') return NodeFilter.FILTER_REJECT;
          if (node.parentElement?.tagName === 'MARK') return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );
    let node = walker.nextNode();
    while (node) {
      textNodes.push(node);
      node = walker.nextNode();
    }

    let fullText = '';
    const nodeMap = [];
    textNodes.forEach(node => {
      const start = fullText.length;
      const text = node.textContent;
      fullText += text;
      nodeMap.push({ node, start, end: fullText.length, text });
    });

    const searchIndex = fullText.toLowerCase().indexOf(highlightText.toLowerCase());
    if (searchIndex === -1) return;

    const searchEnd = searchIndex + highlightText.length;
    const affectedNodes = nodeMap.filter(item =>
      (item.start < searchEnd && item.end > searchIndex)
    );

    affectedNodes.forEach((item, index) => {
      const isFirst = index === 0;
      const isLast = index === affectedNodes.length - 1;
      const startOffset = isFirst ? searchIndex - item.start : 0;
      const endOffset = isLast ? searchEnd - item.start : item.text.length;

      const text = item.node.textContent;
      const fragment = document.createDocumentFragment();

      if (startOffset > 0) {
        fragment.appendChild(document.createTextNode(text.substring(0, startOffset)));
      }

      const mark = document.createElement('mark');
      mark.textContent = text.substring(startOffset, endOffset);
      fragment.appendChild(mark);

      if (endOffset < text.length) {
        fragment.appendChild(document.createTextNode(text.substring(endOffset)));
      }

      item.node.parentNode.replaceChild(fragment, item.node);
    });
  }, [highlightText]);

  return <div ref={containerRef}>{children}</div>;
}

export default CrossElementHighlighter;