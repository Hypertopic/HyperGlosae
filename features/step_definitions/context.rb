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

Soit('je vois les sources') do
  expect(find('.sources'))
end

Soit('je vois les gloses') do
  expect(find('.gloses'))
end

Soit('je ne vois pas les sources') do
  expect(find('.sources', :visible => :hidden))
end

Soit('je ne vois pas les gloses') do
  expect(find('.gloses', :visible => :hidden))
end

Soit('je suis sur téléphone') do
  resize_window(550, 800)
end

Soit('je suis sur ordinateur') do
  resize_window(1080, 1920)
end

Soit('une session active avec mon compte') do
  sign_in('alice', 'whiterabbit')
end

Soit('un document existant affiché comme document principal') do
  visit '/'
  sign_in('alice', 'whiterabbit')
  click_on_icon('create-document')
  sign_out
end

Soit("un document dont je suis l'auteur affiché comme glose") do
  visit '/'
  sign_in('alice', 'whiterabbit')
  click_on_icon('create-document')
  click_on_icon('create-document')
  sign_out
end

Soit("un document dont je ne suis pas l'auteur affiché comme glose") do
  visit '/'
  sign_in('bill', 'madhatter')
  click_on_icon('create-document')
  click_on_icon('create-document')
  sign_out
end

Soit('un document existant contenant :') do |markdown|
  visit '/'
  sign_in('bill', 'madhatter')
  click_on_icon('create-document')
  click_on_icon('create-document')
  click_on_text('content')
  find('textarea').fill_in with: markdown
  leave_textarea
  click_on_icon('focus')
  sign_out
end

