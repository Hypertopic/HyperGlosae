Quand('je me focalise sur {string}') do |title|
  click_on_icon_next_to('focus', title)
end

Quand('je consulte le contenu de {string}') do |title|
  click_on_icon_next_to('open', title)
end

Quand("j'essaie de créer un nouveau document") do
  click_on_icon('create-document')
end

Quand("j'essaie de remplacer les métadonnées de la glose par :") do |metadata|
  click_on_text('metadata')
  find('textarea').fill_in with: metadata
  leave_textarea
end

Quand("j'attache le type {string}") do |type|
  click_on_icon('typeIcon')
  find('.typeBadge', text: type).click
end

Quand("j'essaie de remplacer le contenu de la glose par :") do |markdown|
  click_on_text('content')
  find('textarea').fill_in with: markdown
  leave_textarea
end

Quand('je crée une collection à partir de ce document') do
  click_on_icon('create-collection')
end

Quand("je navigue vers le document suivant") do
  click_on('->')
end

Quand("j'ajoute \"Photographie : vitrail, baie 113\" à la collection {string}") do |title|
  click_on_icon('addCollection')
  collection_list = all('.collectionList', visible: true)
  random_index = rand(collection_list.length)
  collection_list[random_index].click
  # find('.collectionList').click
end