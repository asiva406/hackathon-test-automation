Feature: One Touch E2E Twitter Automation

Scenario Outline: Scenario Outline name: Post 3 Tweets via Web UI
    Given the user is authenticated on Twitter API
    When the user posts "<TweetNo>" tweet using the Twitter API with the following "<content>"
    # Then all <TweetNo> tweets should appear on the users timeline
Examples:
    | TweetNo | content          |
    | First     | First tweet      |
    # | Second    | Second tweet     |
    # | Third     | Third tweet      |