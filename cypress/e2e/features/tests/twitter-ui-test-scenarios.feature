Feature: One Touch E2E Twitter Automation

Scenario: Post 3 Tweets via Web UI
    Given the user is authenticated on Twitter Web
    When the user posts "3" tweets using the Twitter Web UI
    Then all "3" tweets should appear on the user's timeline
    And screenshots of all "3" tweets are taken and saved to the downloads folder

# Scenario: Post 3 Tweets via API
#     Given the user is authenticated on Twitter API
#     When the user posts "3" tweets using the Twitter API
#     Then all 3 tweets should appear on the user's timeline
#     And screenshots of each tweet are taken and saved to the downloads folder

# Scenario: Create a new post on Instagram with previously taken screenshots
#     Given the user is authenticated on Instagram
#     When the user creates a new post with the previously taken screenshots
#     Then the new post should appear on the user's Instagram profile
#     And the screenshots are saved in the post
