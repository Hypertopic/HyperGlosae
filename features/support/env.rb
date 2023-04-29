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
    timeout: 30
  )
end

def click_on_icon_next_to(action, text)
  find(:xpath, "//span[contains(., \"#{text}\")]/preceding-sibling::a[contains(@class, '#{action}')]", match: :first).click
end

def have_image(alternative_text)
  have_xpath(".//img[@alt='#{alternative_text}']")
end
