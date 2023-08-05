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

Alors("je vois que l'image de la licence de la glose est {string}") do |image|
  expect(find('.scholium .license')).to have_image image
end

Alors("l'image intégrée dans la page {string} est légendée par son titre : {string}") do |image, image_caption|
  expect(find('.page')).to have_content image_caption
end

Alors("l'image intégrée en source {string} est légendée par son titre : {string}") do |image, image_caption|
  expect(find('.sources')).to have_content image_caption
end

Alors('le type {string} est le type de la glose ouverte') do |type| 
  expect(find('.typeBadge')).to have_content type
end

Alors('le document comporte la vidéo avec pour titre {string}') do |title|
  within_frame do
    expect(page).to have_content title
  end
end

Alors("le texte {string} est visible dans la navbar") do |text|
  expect(find('.navbar-collec')).to have_content text
end

Alors("{string} est le document affiché à l'écran") do |text|
  expect(find('.runningHead')).to have_content text
end

Alors("{string} est la collection actuelle") do |title|
  expect(find('.current-collection')).to have_content title
end

Alors('la vidéo du document principal se lance de {string} secondes à {string} secondes') do |start, ending|
  expect(page).to have_xpath("//iframe[contains(@src, 'start=#{start}&end=#{ending}')]")
end
