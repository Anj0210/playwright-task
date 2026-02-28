const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../Pages/LoginPage');

test('Verify user can login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // 1. Navigate to Login instead of Signup
    await page.goto('https://my.saleshandy.com/login');

    // 2. Use your existing, manually created account
    await loginPage.login('singhanjali2970@gmail.com', 'Atttech@0210');

    // 3. Verify you landed on the dashboard
    await expect(page).toHaveURL("https://my.saleshandy.com/mfa-verify");
});