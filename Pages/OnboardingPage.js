// pages/OnboardingPage.js
class OnboardingPage {
    constructor(page) {
      this.page = page;
      // Account type radio buttons
      this.clientRadio = page.locator("//div[contains(@class, 'radio')]//span[text()='Clients']/ancestor::label//input[@type='radio']");
      this.businessRadio = page.locator("//span[text()='Business']/ancestor::label//input[@type='radio']");
      this.personalRadio = page.locator("//span[text()='Personal Use']/ancestor::label//input[@type='radio']");
      
      // Next button - generic selector for onboarding steps
      this.nextButton = page.locator('button:has-text("Continue")').first();
      this.submitButton = page.locator('button:has-text("Get Started")').first();
    }
  
    async selectAccountType(accountType) {
      if (accountType === 'Clients') {
        await this.clientRadio.click({ timeout: 10000 });
      } else if (accountType === 'Business') {
        await this.businessRadio.click({ timeout: 10000 });
      } else if (accountType === 'Personal Use') {
        await this.personalRadio.click({ timeout: 10000 });
      }
    }
  
    async clickNext() {
      await this.nextButton.click({ timeout: 10000 }).catch(async () => {
        await this.submitButton.click({ timeout: 10000 });
      });
    }
  
    async completeOnboarding(accountType) {
      // Select the account type
      await this.selectAccountType(accountType);
      
      // Click continue/submit
      await this.clickNext();
      
      // Wait for navigation or next step
      await this.page.waitForTimeout(2000);
    }
  
    async isOnOnboardingPage() {
      const url = this.page.url();
      return url.includes('/onboarding') || url.includes('/setup');
    }
  }
  
  module.exports = { OnboardingPage };
