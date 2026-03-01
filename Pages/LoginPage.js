class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('//input[@name="email"]');
        this.passwordInput = page.locator('//input[@name="password"]');
        this.loginBtn = page.locator('//button[@type="submit"]');
    }

    async login(email, pass) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(pass);
        await this.loginBtn.click();
    }

    async isOnOnboardingPage() {
        const url = this.page.url();
        return url.includes('/onboarding') || url.includes('/setup');
    }
}

module.exports = { LoginPage };
