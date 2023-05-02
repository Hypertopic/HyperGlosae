Soit('la liste des documents affichée') do
  visit '/'
end

Soit('{string} le document principal') do |title|
  visit '/'
  click_on_icon_next_to('focus', title)
end

Soit('{string} une des sources') do |title|
  expect(find('.sources')).to have_content title
end

Soit('{string} une des gloses') do |title|
  expect(find('.gloses')).to have_content title
end

Soit('une session active avec mon compte') do
  fill_in placeholder: "Username", with: 'alice'
  fill_in placeholder: 'Password', with: 'whiterabbit'
  click_on 'Sign in'
  expect(page).to have_content 'alice'
end
