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

Alors('je peux lire {string}') do |text|
  expect(page).to have_content text
end

Alors('je peux lire:') do |text|
  expect(page).to have_content text
end

Alors('je ne peux pas lire {string}') do |text|
  expect(page).not_to have_content text
end

Alors("je vois l'image {string}") do |alternative_text|
  expect(page).to have_image(alternative_text)
end

Alors("je ne vois pas l'image {string}") do |alternative_text|
  expect(page).not_to have_image(alternative_text)
end

Alors("je vois que la licence du document principal est {string}") do |text|
  expect(page).to have_content text
end

Alors("je vois que la licence de la glose est {string}") do |text|
  expect(find('.scholium .license')).to have_content text
end
