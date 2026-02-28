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
      await this.password.fill(pass);
      await this.signupBtn.click();
    }
  }
  module.exports = { SignupPage };