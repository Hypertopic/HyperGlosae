Quand('je me focalise sur {string}') do |title|
  click_on_icon_next_to('focus', title)
end

Quand('je consulte le contenu de {string}') do |title|
  click_on_icon_next_to('open', title)
end

Quand("j'essaie de remplacer le contenu de la glose par :") do |markdown|
  click_on_text('content')
  fill_element('textarea', markdown)
  leave_textarea
end

Quand("j'essaye d'ajouter une image à une glose") do
  click_on_contextual_menu('scholium', 1)
  attach_file("image-input", File.expand_path("./docs/architecture.png"), make_visible: true)
end

Quand("je réutilise {string} comme glose de type {string}") do |title, type|
  select type, from: 'select-dropdown'
  click_on_icon('select-document')
  document_list = all('.documentList', visible: true)
  document_to_select = document_list.find { |document| document.text.include?(title) }
  document_to_select.click
end

