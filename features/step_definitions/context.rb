Soit('la liste des documents affichée') do
  visit '/'
end

Soit('{string} le document principal') do |title|
  case title
    when "Les fées (Charles Perrault)"
      visit '/37b4b9ba5cdb11ed887beb5c373fa643'
    when "Analyse de l'entretien"
      visit '/c2b9f52285ce11edbd0aff9b25defbab'
    when "Photographie : vitrail, baie 113, Église Saint-Nizier, Troyes"
      visit '/b8cc79d8abba11edb9ee53989bc96c06'
    when "A tündérek (Charles Perrault)"
      visit '/09c906c6732b11ed89466ba197585f87'
    when "Étiquetage de l'entretien"
      visit '/6327c5008d1f11ed9aa8e7ae771dee2e'
    when "Soleil noir et étoiles qui tombent – Comparaison de vitraux"
      visit '/a0cdf96ab2c211ed9f5ecfb8095a0b31'
    when "Vidéo Sherlock Jr. (Buster Keaton)"
      visit '/4e1a31e14b032f2fa9e161ee9b009125'
    when "Treignes, le 8 septembre 2012 (Christophe Lejeune)"
      visit '/6b56ee657c870dfacd34e9ae4e0643dd'
    when "Entretien avec un responsable d'opération"
      visit '/05b61f5285c711ed97bf6b9b56808c45'
  end
end

Soit('{string} une des sources') do |title|
  expect(find('.sources')).to have_content title
end

Soit('{string} une des gloses') do |title|
  expect(find('.gloses')).to have_content title
end

Soit('une session active avec mon compte') do
  sign_in('alice', 'whiterabbit')
end

Soit('un document existant affiché comme document principal') do
  visit '/'
  sign_in('alice', 'whiterabbit')
  click_on_icon('create-document')
  click_on_icon('focus')
  sign_out
end

Soit('un document existant affiché avec le titre par défaut comme document principal') do
  visit '/'
  sign_in('alice', 'whiterabbit')
  click_on_icon('create-document')
  click_on_icon('focus')
  sign_out
end

Soit("un document existant affiché comme document principal dont je ne suis pas l'auteur") do
  visit '/'
  sign_in('bill', 'madhatter')
  click_on_icon('create-document')
  click_on_icon('focus')
  sign_out
end

Soit("un document dont je suis l'auteur affiché comme glose") do
  visit '/'
  sign_in('alice', 'whiterabbit')
  click_on_icon('create-document')
  click_on_icon('focus')
  click_on_icon('gloses .create-document')
  sign_out
end

Soit("un document dont je ne suis pas l'auteur affiché comme glose") do
  visit '/'
  sign_in('bill', 'madhatter')
  click_on_icon('create-document')
  click_on_icon('focus')
  click_on_icon('gloses .create-document')
  sign_out
end

Soit('un document existant contenant :') do |markdown|
  visit '/'
  sign_in('bill', 'madhatter')
  click_on_icon('create-document')
  click_on_text('content', '<TEXT>')
  find('textarea').fill_in with: markdown
  leave_textarea
  click_on_icon('focus')
  sign_out
end

Soit('un document en deux passages affiché comme document principal') do
  visit '/'
  sign_in('bill', 'madhatter')
  click_on_icon('create-document')
  click_on_text('content', '<TEXT>')
  find('textarea').fill_in with:
  """
  {1} First passage.
  {2} Second passage.
  """
  leave_textarea
  click_on_icon('focus')
  sign_out
end

Soit("un autre document, en plusieurs passages, affiché comme glose et dont je suis l'auteur") do
  sign_in('alice', 'whiterabbit')
  click_on_icon('gloses .create-document')
  click_on_text('content')
  find('textarea').fill_in with:
  """
  {1} First side passage.
  {2} Second side passage.
  """
  leave_textarea
  sign_out
end

Soit("un autre document, non découpé, affiché comme glose et dont je suis l'auteur") do
  sign_in('alice', 'whiterabbit')
  click_on_icon('gloses .create-document')
  sign_out
end

Soit('{string} une des gloses ouverte') do |title|
  click_on_icon_next_to('open', title)
end

Soit('une glose faisant référence uniquement à la partie une') do
  click_on_icon('gloses .create-document')
  click_on_text('content', '<TEXT>')
  find('textarea').fill_in with:
  """
  {1} First side passage
  """
  leave_textarea
  expect(page).to have_content 'First side passage'
end

Soit("le document intitulé {string} n'est pas affiché") do |title|
  expect(page).not_to have_content(title)
end

Soit('le document intitulé {string} est affiché') do |title|
  expect(page).to have_content(title)
end

Soit('je crée un document avec les métadonnées suivantes:') do |metadata|
  click_on_text('metadata')
  fill_element('textarea', metadata)
  leave_textarea
end

Soit("un document que l'on consulte") do
  visit '/146e6e8442f0405b721b79357d00d0a1'
end
