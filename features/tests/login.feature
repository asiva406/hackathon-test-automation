Feature: Validate all the menu items on the home screen

  Scenario: Validate all the menu items on the home screen
    Given Launch the application
    When I am on the Home Page
    Then I should see all menu items
