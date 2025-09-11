import { $, driver } from '@wdio/globals'

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage {
    /**
     * define selectors using getter methods
     */
    public get accessibilityMenu () {
        return $('//android.widget.TextView[@content-desc="Accessibility"]');
    }

    public get animationMenu () {
        return $('//android.widget.TextView[@content-desc="Animation"]');
    }

    public get appMenu () {
        return $('//android.widget.TextView[@content-desc="App"]');
    }

    public get contentMenu () {
        return $('//android.widget.TextView[@content-desc="Content"]');
    }

    public get graphicsMenu () {
        return $('//android.widget.EditText[@content-desc="Graphics"]');
    }

    public async validateMenuItems () {
        await this.accessibilityMenu.isDisplayed();
        await this.animationMenu.isDisplayed();
        await this.appMenu.isDisplayed();
        await this.contentMenu.isDisplayed();
        await this.graphicsMenu.isDisplayed();
    }

    public async launchApp () {
        await driver.execute('mobile: activateApp', { appId: 'io.appium.android.apis' });
    }
    
    public async waitForHomePage () {
        await this.accessibilityMenu.waitForDisplayed({ timeout: 5000 });
    }
}

export default new LoginPage();
