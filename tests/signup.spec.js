const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../Pages/SignupPage');

test.describe('Signup Flow Tests', () => {
    test('Register a new user', async ({ page }) => {
         test.setTimeout(120000);
         const signupPage = new SignupPage(page);

        // // Generate a unique email address
         const timestamp = Date.now();
         const email = `user${timestamp}@gmail.com`; // Removes the '+' character

        // Navigate to the signup page
        await page.goto('https://my.saleshandy.com/signup', { 
           
            waitUntil: 'domcontentloaded', 
            timeout: 60000 // Giving it a bit more breathing room
        });
        //await page.pause();
        //await page.pause(); // Pause to inspect the page before filling the form

        // Register a new user
        //await page.setViewportSize({ width: 1920, height: 1080 });
         await signupPage.registerUser('John', 'Doe', email, 'Password123@');
        
        // Check for error messages
       

        // Validate successful signup
        await expect(page.locator("//h1[contains(text(),'shape your experience']")).toBeVisible();
    });
});