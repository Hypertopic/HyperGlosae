require 'capybara/cucumber'
require 'capybara/cuprite'

Before do
  Capybara.current_session.driver.add_headers("Accept-Language" => "fr")
end
Capybara.run_server = false
Capybara.default_driver = :cuprite
Capybara.javascript_driver = :cuprite
Capybara.app_host = ENV["APP_HOST"] || "http://localhost:3000"
Capybara.default_max_wait_time = 10
Capybara.register_driver(:cuprite) do |app|
  Capybara::Cuprite::Driver.new(app,
    browser_options: {
      'no-sandbox': nil,
      'disable-smooth-scrolling': true
    },
    timeout: 15
  )
end

def click_on_icon_next_to(action, text)
  find(:xpath, "//span[contains(., \"#{text}\")]/preceding-sibling::a[contains(@class, '#{action}')]", match: :first).click
end

def click_on_icon(action)
  find(".#{action}").click
end

def click_on_text(type, text = '')
  find(".editable.#{type}", text: text, match: :first).click
end

def have_image(alternative_text)
  have_xpath(".//img[@alt='#{alternative_text}']")
end

def sign_in(username, password)
  fill_in placeholder: "Username", with: username
  fill_in placeholder: 'Password', with: password
  click_on 'Sign in'
  expect(page).to have_content username
end

def sign_out
  page.execute_script("
    document.getElementsByClassName('navbar')[0]
      .getElementsByClassName('dropdown')[0]
      .getElementsByClassName('dropdown-toggle')[0]
      .dispatchEvent(new Event('click', {bubbles:true}))
  ")
  click_on "Sign out"
end

def leave_textarea
  find('.navbar').click
end

def go_on_document_inside_collection(document, collection)
  visit "/collection/#{collection}/document/#{document}"
end

def fill_element(selector, text)
  find(selector).fill_in with: text
end

def click_on_element(class_name, text)
  find(class_name, text: text).click
end

def click_on_contextual_menu(context_classes, context_order = 0)
  page.execute_script("
    let area = document.getElementsByClassName('#{context_classes}')[#{context_order}];
    let dropdown = area.getElementsByClassName('dropdown')[0];
    dropdown.style.visibility = 'visible';
    dropdown.getElementsByClassName('toggle')[0].dispatchEvent(new Event('click', {bubbles:true}))
  ")
end

def click_on_contextual_menu_item(item_locator, context_classes, context_order = 0)
  click_on_contextual_menu(context_classes, context_order)
  click_on(item_locator)
end
