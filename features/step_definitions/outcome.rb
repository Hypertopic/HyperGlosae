Alors('{string} est le document principal') do |title|
  expect(find('.main .work')).to have_content title
  expect(page).to have_title title
end

Alors('{string} est une des sources') do |title|
  expect(find('.sources')).to have_content title
end

Alors('{string} est une des gloses') do |title|
  expect(find('.gloses')).to have_content title
end

Alors('{string} est la glose ouverte') do |title|
  expect(find('.runningHead .scholium')).to have_content title
end

Alors('je peux lire {string}') do |text|
  expect(page).to have_content text
end

Alors('je peux lire:') do |text|
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

Alors("je vois que l'image de la licence du document principal est {string}") do |image|
  expect(page).to have_image image
end

Alors("l'image intégrée dans la page {string} est légendée par son titre : {string}") do |image, image_caption|
  expect(find('.lectern')).to have_content image_caption
end

Alors("l'image intégrée en source {string} est légendée par son titre : {string}") do |image, image_caption|
  expect(find('.sources')).to have_content image_caption
end

Alors('le type {string} est le type de la glose ouverte') do |type| 
  expect(find('.typeBadge')).to have_content type
end

Alors('le document comporte la vidéo {string}') do |uri|
  expect(page).to have_xpath("//iframe[contains(@src, '#{uri}')]")
end

Alors('la vidéo du document principal se lance de {string} secondes à {string} secondes') do |start, ending|
  expect(page).to have_xpath("//iframe[contains(@src, 'start=#{start}&end=#{ending}')]")
end

Alors('le texte du premier passage de la glose est :') do |text|
  expect(find('.editable.content', match: :first).text).to match /\A#{text}\z/
end

Alors('le créateur est {string}') do |string|
  expect(find('.metadata > .work', match: :first)).to have_content string
end

Alors('l\'année de publication est {string}') do |string|
  expect(find('.metadata > .edition', match: :first)).to have_content string
end

Alors('le texte à la fin du commentaire contient la nouvelle référence temporelle') do 
  expect(find('.scholium textarea').text).to match(/[0-9:.]+ --> [0-9:.]+\n<TEXT>/)
end

Alors('la glose est ouverte en mode édition') do
  expect(page).to have_css('.scholium textarea')
end