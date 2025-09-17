Feature: Twitter GUI Test Automation

    Scenario: Post 1 Tweets via Web UI
        Given the user is authenticated on Twitter Web
        When the user posts "1" tweets using the Twitter Web UI
        Then all "1" tweets should appear on the users timeline
        And screenshots of all "1" tweets are taken and saved to the downloads folder