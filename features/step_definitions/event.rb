Quand('je me focalise sur {string}') do |title|
  click_on_icon_next_to('focus', title)
end

Quand('je consulte le contenu de {string}') do |title|
  click_on_icon_next_to('open', title)
end
