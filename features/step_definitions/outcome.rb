Alors('{string} est le document principal') do |title|
  expect(find('.main .work')).to have_content title
end

Alors('{string} est une des sources') do |title|
  expect(find('.sources')).to have_content title
end

Alors('{string} est une des gloses') do |title|
  expect(find('.gloses')).to have_content title
end
