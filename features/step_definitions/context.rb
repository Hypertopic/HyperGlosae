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

