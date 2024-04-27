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

Soit("un autre document, en deux passages, affiché comme glose et dont je suis l'auteur") do
  sign_in('alice', 'whiterabbit')
  click_on_icon('create-document')
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
  click_on_icon('create-document')
  sign_out
end

Soit('{string} une des gloses ouverte') do |title|
  click_on_icon_next_to('open', title)
end

Soit('une glose faisant référence uniquement à la partie une') do
  click_on_icon('create-document')
  click_on_text('content', '<TEXT>')
  find('textarea').fill_in with:
  """
  {1} First side passage
  """
  leave_textarea
  expect(page).to have_content 'First side passage'
end
