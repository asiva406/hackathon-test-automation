
import { Before, When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

import * as secrets from "../../../../secrets.json";


let tweetTextsToPost: string[] = [];

// Web UI Scenario
Given('the user is authenticated on Twitter Web', () => {
  cy.visit('https://twitter.com/login');

  cy.contains('Phone, email, or username').should('be.visible').click().type(secrets.EmailId)
  cy.contains('Next').should('be.visible').click()
  cy.contains('Phone or username').should('be.visible').click().type(secrets.UserName)
  cy.contains('Next').should('be.visible').click()
  cy.contains('Password').should('be.visible').click().type(secrets.Password)

  cy.contains('Log in').should('be.visible').click()

});



When('the user posts {string} tweets using the Twitter Web UI', (tweetCount: string) => {
  const count = parseInt(tweetCount);
  tweetTextsToPost = Array.from({ length: count }, (_, i) => `Automated tweet #${i + 1} - ${Date.now()}`);
  tweetTextsToPost.forEach((tweetText) => {
    cy.get('[data-testid="tweetTextarea_0"]').type(tweetText);
    cy.get('[data-testid="tweetButtonInline"]').should('be.visible').click();
    cy.wait(2000); // Wait for tweet to post
    cy.get('[role="dialog"] button[aria-label="Close"]').click();

    cy.log(`Posting tweet: ${tweetText}`);

  });
});

Then("all {string} tweets should appear on the user's timeline", (tweetCount: string) => {
  const count = parseInt(tweetCount);
  for (let i = 1; i < count+1; i++) {
    cy.get('[data-testid="cellInnerDiv"]').eq(i).should('contain.text', tweetTextsToPost[count-i]);
  }
});

Then('screenshots of all {string} tweets are taken and saved to the downloads folder', (tweetCount: string) => {
  const count = parseInt(tweetCount);
  for (let i = 1; i < count+1; i++) {
    cy.get('[data-testid="cellInnerDiv"]').eq(i).screenshot(`tweet_${i}`);
  }
});

// API Scenario
Given('the user is authenticated on Twitter API', () => {
  // Implement authentication for Twitter API
});

When('the user posts 3 tweets using the Twitter API', () => {
  // Implement posting 3 tweets via API
});

Then("all 3 tweets should appear on the user's timeline", () => {
  // Implement verification of 3 tweets on timeline
});

// Instagram Scenario
Given('the user is authenticated on Instagram', () => {
  // Implement authentication for Instagram
});

When('the user creates a new post with the previously taken screenshots', () => {
  // Implement creating a new Instagram post with screenshots
});

Then("the new post should appear on the user's Instagram profile", () => {
  // Implement verification of new post on Instagram profile
});

Then('the screenshots are saved in the post', () => {
  // Implement verification that screenshots are saved in the post
});

