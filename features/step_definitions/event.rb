Quand('je consulte le contenu de {string}') do |title|
  click_on_icon_next_to('open', title)
end

Quand("j'essaye d'ajouter une image à une glose") do
  click_on_contextual_menu('scholium', 1)
  attach_file("image-input", File.expand_path("./docs/architecture.png"), make_visible: true)
end

