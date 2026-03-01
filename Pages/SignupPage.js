// pages/SignupPage.js
class SignupPage {
    constructor(page) {
      this.page = page;
      this.firstName = page.locator("//input[@name='firstName']");
      this.lastName = page.locator("//input[@name='lastName']");
      this.email = page.locator("//input[@name='email']");
      this.password = page.locator("//input[@name='password']");
      this.signupBtn = page.locator("//button[@type='submit']");
    }
  
    async registerUser(first, last, email, pass) {
      await this.firstName.fill(first);
      await this.lastName.fill(last);
      await this.email.fill(email);
      
      // Handle phone - try to fill if field exists
      try {
        const phoneElement = this.page.locator("//input[@name='phone']");
        if (await phoneElement.count() > 0) {
          await phoneElement.fill('1234567890').catch(() => {});
        }
      } catch (e) {
        // Phone field is optional, ignore errors
      }
      
      await this.password.fill(pass);
      
      // Click the signup button
      await this.signupBtn.click();
      
      // Wait briefly for navigation
      await this.page.waitForTimeout(2000);
    }
  }
  module.exports = { SignupPage };
