Soit("un document dont je ne suis pas l'auteur affiché comme glose") do
  visit '/4e1a31e14b032f2fa9e161ee9b123456'
  sign_in('bill', 'madhatter')
  click_on_icon('create-document')
  sign_out
end

