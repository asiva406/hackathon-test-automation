/// <reference types="cypress" />

import "cypress-real-events";
import { CypressBrowserUtils } from "../../../ProjectUtilities/browserutils";
import TwitterScreenControls from "./twitter-screen-controls";
const twitterScreenControls = new TwitterScreenControls();

import * as secrets from "../../../secrets.json";

export default class twitterfunctions {
  twitter_login() {
    CypressBrowserUtils.checkElementAndEnterText(
      TwitterScreenControls.phoneEmailOrUsernameInput_selector,
      secrets.EmailId
    ).then(() => {
      twitterScreenControls.get_nextButton().click();
    });

    CypressBrowserUtils.checkElementAndEnterText(
      TwitterScreenControls.phoneOrUsernameInput_selector,
      secrets.UserName
    ).then(() => {
      twitterScreenControls.get_nextButton().click();
    });

    CypressBrowserUtils.checkElementAndEnterText(
      TwitterScreenControls.passwordInput_selector,
      secrets.Password
    ).then(() => {
      twitterScreenControls.get_logInButton().click();
    });
  }

  post_tweet(tweetText: string) {
    twitterScreenControls
      .get_tweetTextarea()
      .should("be.visible")
      .type(tweetText);
    twitterScreenControls.get_tweetButtonInline().should("be.enabled").click();

    CypressBrowserUtils.checkElementAndClick(
      TwitterScreenControls.tweetCloseDialogButton_selector
    );
    cy.log(`Posting tweet: ${tweetText}`);
  }

  verify_tweet(tweetCount: any, tweetTextsToPost: string[]) {
    for (let i = 1; i < tweetCount + 1; i++) {
      cy.get('[data-testid="cellInnerDiv"]')
        .eq(i - 1)
        .should("contain.text", tweetTextsToPost[tweetCount - i]);
    }
  }

  capture_tweet_screenshot(tweetCount: number) {
    for (let i = 1; i < tweetCount + 1; i++) {
      cy.get('[data-testid="cellInnerDiv"]')
        .eq(i - 1)
        .screenshot(`screenshots/tweet_${i}`);
    }
  }
}
