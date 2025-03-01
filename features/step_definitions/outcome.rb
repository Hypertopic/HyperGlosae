Alors('je peux lire {string}') do |text|
  expect(page).to have_content text
end

Alors('je ne peux pas lire {string}') do |text|
  expect(page).not_to have_content text
end

Alors("je vois l'image {string} dans le document principal") do |alternative_text|
  expect(find('.row:not(.runningHead)>.main')).to have_image(alternative_text)
end

Alors("je vois l'image {string} dans la glose") do |alternative_text|
  expect(find('.row:not(.runningHead)>.scholium')).to have_image(alternative_text)
end

Alors("je ne vois pas l'image {string}") do |alternative_text|
  expect(page).not_to have_image(alternative_text)
end

Alors("je vois que le code de la licence est {string}") do |license|
  expect(page).to have_image license
end

Alors("l'image intégrée dans la page {string} est légendée par son titre : {string}") do |image, image_caption|
  expect(find('.lectern')).to have_content image_caption
end

Alors("l'image intégrée en source {string} est légendée par son titre : {string}") do |image, image_caption|
  expect(find('.sources')).to have_content image_caption
end

Alors('le document comporte la vidéo {string}') do |uri|
  expect(page).to have_xpath("//iframe[contains(@src, '#{uri}')]")
end

Alors('le texte du premier passage de la glose est :') do |text|
  expect(find('.editable.content', match: :first).text).to match /\A#{text}\z/
end

Alors('la glose est ouverte en mode édition et contient :') do |text|
  expect(find('.scholium textarea')).to have_content text
end

