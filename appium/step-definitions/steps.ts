import { Given, When, Then } from '@wdio/cucumber-framework';
import loginPage from '../pageobjects/login';

Given('Launch the application', async () => {
    await loginPage.launchApp();
});

When('I am on the Home Page', async () => {
    await loginPage.waitForHomePage();
});

Then('I should see all menu items', async () => {
    await loginPage.validateMenuItems();
});

