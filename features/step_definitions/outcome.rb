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

Alors('la glose ouverte a le titre par défaut') do
  expect(find('.runningHead .scholium')).to have_content "<TITLE>"
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

Alors("je vois que le code de la licence est {string}") do |license|
  expect(page).to have_image license
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

Alors('la glose est ouverte en mode édition') do
  expect(page).to have_css(".scholium > form")
end

Alors('la glose est ouverte en mode édition et contient :') do |text|
  expect(find('.scholium textarea')).to have_content text
end

Alors("le texte du document principal est en surbrillance :") do |highlighted_text|
  highlighted_element = find('mark', text: highlighted_text.strip)
  expect(highlighted_element).not_to be_nil
end

Alors('je peux lire {string} dans la liste des types') do |text|
  expect(find('.list-group')).to have_content text
end

Alors('je ne peux rien lire dans la liste des types') do
  expect(find('.list-group')).not_to have_content "Ethnography/Report"
  expect(find('.list-group')).not_to have_content "Ethnography/Analysis"
  expect(find('.list-group')).not_to have_content "Ethnography/Interview"
end

Alors('bill peut modifier le document') do
  sign_out
  sign_in('bill', 'madhatter')
  find('.editable.content').click
  find('textarea').fill_in with: 'content'
  leave_textarea
  expect(find('.editable.content', match: :first).text).to match 'content'
end

Alors('alice ne peut pas modifier le document') do
  sign_out
  sign_in('alice', 'whiterabbit')
  find('.editable.content').click
  find('textarea').fill_in with: 'content'
  leave_textarea
  expect(page).not_to have_selector('.editable.content', text: 'content')
end

Alors('bill ne peut pas modifier le document') do
  sign_out
  sign_in('bill', 'madhatter')
  find('.editable.content').click
  find('textarea').fill_in with: 'content'
  leave_textarea
  expect(page).not_to have_selector('.editable.content', text: 'content')
end

