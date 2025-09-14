// Cypress Browser Utilities
export class CypressBrowserUtils {

    /**
     * This method is useful to check if an element exists before trying to enter text into it.
     * It skips the action if the element is not found, preventing test failures.
     */
	static checkElementAndEnterText(selector: string, text: string): Cypress.Chainable {
		// code to wait till page loads completely
		cy.wait(1000); 

		return cy.get('body').then(($body) => {
			if ($body.find(selector).length) {
				return cy.get(selector).should('exist').and('be.visible').clear().type(text);
			} else {
				cy.log(`Element with selector ${selector} not found.`);
				return cy.wrap({});
			}
		});
	}

	/**
	 * This method is useful to check if an element exists before trying to click it.
	 * It skips the action if the element is not found, preventing test failures.
	 */
	static checkElementAndClick(selector: string): Cypress.Chainable {
		// code to wait till page loads completely
		cy.wait(1000); 

		return cy.get('body').then(($body) => {
			if ($body.find(selector).length) {
				return cy.get(selector).should('exist').and('be.visible').click();
			} else {
				cy.log(`Element with selector ${selector} not found.`);
				return cy.wrap({});
			}
		});
	}
}

