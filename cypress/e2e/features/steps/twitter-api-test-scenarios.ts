/// <reference types="cypress" />

import { When, Given } from "@badeball/cypress-cucumber-preprocessor";
import APIUtilities from "../../../../ProjectUtilities/APIUtilities";

const apiUtilities = new APIUtilities();

Given("the user is authenticated on Twitter API", () => {

  cy.task("getOauth1",{ url: 'https://api.twitter.com/2/tweets',  method: 'POST',  data: { text: "Hello, this is a tweet from Cypress!" }}).then((headers: any) => {
    const timestamp = new Date().toISOString();
    const request_data = {
      url: 'https://api.twitter.com/2/tweets',
      method: 'POST',
      data: { text: `Hello, this is a tweet from Cypress - ${timestamp}!` }
    };

    apiUtilities.oauth1post_request(request_data.url, request_data.data, headers).then((response) => {
      cy.log('Tweet posted successfully:', response.body);
    });
  });
});

When("the user posts {string} tweet using the Twitter API with the following {string}", (TweetNo: string, content: string) => {
  cy.log(`User posts ${TweetNo} tweet using Twitter API with content: ${content}`);
});

// Then("all {string} tweets should appear on the users timeline", (Count: string) => {
//     // tweetCount = parseInt(Count);
//     // twitterFunctions.verify_tweet(tweetCount, tweetTextsToPost);
//   }
// );
