Feature: One Touch E2E Twitter Automation

Scenario: Post 3 Tweets via Web UI
    # Given the user is authenticated on Twitter Web
    # When the user posts "3" tweets using the Twitter Web UI
    Then all "3" tweets should appear on the users timeline
    And screenshots of all "3" tweets are taken and saved to the downloads folder