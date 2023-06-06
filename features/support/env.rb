require 'capybara/cucumber'
require 'capybara/cuprite'

Before do
  Capybara.current_session.driver.add_headers("Accept-Language" => "fr")
end
Capybara.run_server = false
Capybara.default_driver = :cuprite
Capybara.javascript_driver = :cuprite
Capybara.app_host = ENV["APP_HOST"] || "http://localhost:3000"
Capybara.default_max_wait_time = 20
Capybara.register_driver(:cuprite) do |app|
  Capybara::Cuprite::Driver.new(app,
    browser_options: {
      'no-sandbox': nil,
      'disable-smooth-scrolling': true
    },
    timeout: 30
  )
end

def click_on_icon_next_to(action, text)
  find(:xpath, "//span[contains(., \"#{text}\")]/preceding-sibling::a[contains(@class, '#{action}')]", match: :first).click
end

def click_on_icon(action)
  find(".#{action}").click
end

def click_on_text(type)
  find(".editable.#{type}").click
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
  refresh
end

def leave_textarea
  find('.navbar').click
end

def resize_window(width, heigth)
  page.current_window.resize_to(width, heigth)
end

def go_on_document_inside_collection(document, collection)
  visit "/collection/#{collection}/document/#{document}"
end

def get_id(name)
  case name
    when "Vitrail : Vie de Jean le Baptiste"
      id = "ejrbzoefkznfkpz20"
    when "Visite de l'Eglise St-Jean-au-Marché"
      id = "ejrbzoefkznfkpzp"
    else
      id = "Not found"
    end
  return id
end

def fill_element(selector, text)
  find(selector).fill_in with: text
end

def click_on_element(class_name, text)
  find(class_name, text: text).click
end
