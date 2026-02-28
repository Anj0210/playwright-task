const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../Pages/SignupPage');

const accountTypes = ['Business', 'Clients', 'Personal Use'];

for (const type of accountTypes) {
    test(`Verify Onboarding flow for ${type}`, async ({ page }) => {
        const signupPage = new SignupPage(page);
        
        // Use the generic logic to handle account type
        await page.goto('https://my.saleshandy.com/sequence');
        await signupPage.selectAccountType(type);

        // Account-specific validations (based on your Excel TCs)
        if (type === 'Clients') {
            await expect(page.locator("//h1[@class='onboarding-modal--question']")).toBeVisible();
        } else if (type === 'Business') {
            await expect(page.locator("//h1[@class='onboarding-modal--question']")).toBeVisible();
        }
    });
}