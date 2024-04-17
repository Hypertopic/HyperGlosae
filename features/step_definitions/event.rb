Quand('je me focalise sur {string}') do |title|
  click_on_icon_next_to('focus', title)
end

Quand('je consulte le contenu de {string}') do |title|
  click_on_icon_next_to('open', title)
end

Quand("j'essaie de créer un nouveau document") do
  click_on_icon('gloses .create-document, .bookshelf .create-document')
end

Quand("j'essaie de remplacer les métadonnées de la glose par :") do |metadata|
  click_on_text('metadata')
  fill_element('textarea', metadata)
  leave_textarea
end

Quand("j'attache le type {string}") do |type|
  click_on_icon('typeIcon')
  click_on_element('.typeBadge', type)
end

Quand("j'essaie de remplacer le contenu de la glose par :") do |markdown|
  click_on_text('content')
  fill_element('textarea', markdown)
  leave_textarea
end

Quand("j'essaie de remplacer le contenu du premier passage de la glose par :") do |markdown|
  click_on_text('content')
  fill_element('textarea', markdown)
  leave_textarea
end

Quand('je crée une collection à partir de ce document') do
  click_on_icon('create-collection')
end

Quand("je clique sur la référence temporelle {string} avec pour commentaire {string}") do |timecode, comment|
  find(:xpath, "//p[contains(., \"#{timecode}\")]", match: :first).click
end

Quand("j'essaie d'éditer le bloc {int} avec le texte") do |block_number, markdown|
  find(".lectern>.row:nth-child(#{block_number + 1})>.scholium>.content>p").click
  fill_element('textarea', markdown)
  leave_textarea
end

Quand("Christophe se connecte") do
  sign_in('christophe', 'redqueen')
  expect(find('.navbar')).to have_content 'christophe'
end

Quand("j'essaie de créer une référence au document") do
  click_on_icon('sources .create-document')
end

Quand("je survole le texte :") do |text|
  element = find('p[title="Highlight in document"]', text: text.strip)
  element.hover
end

Quand("je sélectionne le fragment de texte :") do |markdown|
  # WARNING: Does work only with one given example!
  page.execute_script("
      let node = document.getElementsByClassName('lectern col')[0].getElementsByClassName('main col')[2].getElementsByTagName('p')[0].firstChild;
      let range = document.createRange();
      range.setStart(node, 18);
      range.setEnd(node, 128);
      let selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      node.dispatchEvent(new Event('mouseup', {bubbles: true}));
      text = selection.toString();
  ")
  expect(page.evaluate_script('text')).to eq(markdown)
  click_button(class: 'create-fragment')
end

