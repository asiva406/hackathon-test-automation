/// <reference types="cypress" />

// Login screen selectors
const phoneEmailOrUsernameInput = '[autocomplete="username"]';
const phoneOrUsernameInput = '[data-testid="ocfEnterTextTextInput"]';
const passwordInput = '[name="password"]';


// Tweet actions
const tweetTextarea = '[data-testid="tweetTextarea_0"]';
const tweetButtonInline = '[data-testid="tweetButtonInline"]';
const closeDialogButton = '[role="dialog"] button[aria-label="Close"]';

export default class TwitterScreenControls {

  static phoneEmailOrUsernameInput_selector = phoneEmailOrUsernameInput;
  static phoneOrUsernameInput_selector = phoneOrUsernameInput;
  static passwordInput_selector = passwordInput;

  static tweetCloseDialogButton_selector = closeDialogButton;

  get_phoneEmailOrUsernameInput() {
    return cy.get(phoneEmailOrUsernameInput);
  }

  get_nextButton(){
    return cy.contains('Next')
  }

  get_phoneOrUsernameInput() {
    return cy.get(phoneOrUsernameInput);
  }

  get_logInButton(){
    return cy.contains('Log in')
  }

  get_passwordInput() {
    return cy.get(passwordInput);
  }

  get_tweetTextarea() {
    return cy.get(tweetTextarea);
  }

  get_tweetButtonInline() {
    return cy.get(tweetButtonInline);
  }

  get_closeDialogButton() {
    return cy.get(closeDialogButton);
  }
}
