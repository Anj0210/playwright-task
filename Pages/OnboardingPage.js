// pages/OnboardingPage.js
export class OnboardingPage {
    constructor(page) {
      this.page = page;
      //this.businessRadio = page.locator('text=Business');
      this.clientRadio = page.locator("//div[contains(@class, 'radio')]//span[text()='Clients']/ancestor::label//input[@type='radio']");
      this.businessRadio = page.locator("//span[text()='Business']/ancestor::label//input[@type='radio']");
      //this.personalRadio = page.locator('text=Personal Use');
      //this.nextButton = page.locator('button:has(svg)'); // Based on your screenshots
    }
  
    async completeOnboarding(accountType) {
      if (accountType === 'Clients') {
        await this.clientRadio.click();
        //await this.nextButton.click();
        // Add Business specific steps (Company size, Goal)
      } else if (accountType === 'Business') {
        await this.BusinessRadio.click();
        //await this.nextButton.click();
        // Add Client specific steps (Agency type, Volume)
      } else {
        await this.personalRadio.click();
        await this.nextButton.click();
        // Add Personal steps
      }
    }
  }