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
    when "Víly (Charles Perrault)"
      visit '/420ab198674f11eda3b7a3fdd5ea984f'
    when "16e prix - Catégorie 10-13 ans, Ukraine (Yelena SOROCHINSKAYA),2019"
      visit '/b33f9568386e11eea7644766f8f7218a'
  end
end

Soit('{string} une des gloses') do |title|
  expect(find('.gloses')).to have_content title
end

Soit("un document dont je ne suis pas l'auteur affiché comme glose") do
  visit '/4e1a31e14b032f2fa9e161ee9b123456'
  sign_in('bill', 'madhatter')
  click_on_icon('create-document')
  sign_out
end

