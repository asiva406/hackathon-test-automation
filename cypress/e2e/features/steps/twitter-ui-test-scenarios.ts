import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

import * as secrets from "../../../../secrets.json";
import TwitterFunctions from "../../applicationlibrary/twitter-functions";
const twitterFunctions = new TwitterFunctions();

let tweetTextsToPost: string[] = [];
let tweetCount: number;

Given("the user is authenticated on Twitter Web", () => {
  cy.visit(secrets.baseUrl).wait(5000);
  twitterFunctions.twitter_login();
});

When("the user posts {string} tweets using the Twitter Web UI", (Count: string) => {
    tweetCount = parseInt(Count);
    tweetTextsToPost = Array.from(
      { length: tweetCount },
      (_, i) => `Automated tweet #${i + 1} - ${Date.now()}`
    );

    tweetTextsToPost.forEach((tweetText) => {
      twitterFunctions.post_tweet(tweetText);
    });
  }
);

Then("all {string} tweets should appear on the users timeline", (Count: string) => {
    tweetCount = parseInt(Count);
    twitterFunctions.verify_tweet(tweetCount, tweetTextsToPost);
  }
);

Then(
  "screenshots of all {string} tweets are taken and saved to the downloads folder",
  (Count: string) => {
    tweetCount = parseInt(Count);
    twitterFunctions.capture_tweet_screenshot(tweetCount);
  }
);
