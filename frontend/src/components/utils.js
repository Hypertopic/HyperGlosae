export function highlightTextInMainDocument(text) {
  let passages = Array.from(document.getElementsByClassName('main col'));
  passages.forEach(passage => {
    if (passage.innerHTML.includes(text)) {
      passage.innerHTML = passage.innerHTML.replace(text, '<highlighted>' + text + '</highlighted>');
    }
  });
}

export function unHighlightAllTextInMainDocument() {
  let passages = Array.from(document.getElementsByClassName('main col'));
  passages.forEach(passage => {
    passage.innerHTML = passage.innerHTML.replace(/<\/{0,1}highlighted>/g, '');
  });
}
