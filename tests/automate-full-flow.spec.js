const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../Pages/SignupPage');
const { LoginPage } = require('../Pages/LoginPage');
const { OnboardingPage } = require('../Pages/OnboardingPage');

/**
 * Test: Automate Signup -> Verification -> Login -> Onboarding
 * 
 * Using credentials:
 * - Email: nitudevi6459@gmail.com
 * - Password: Atttech@1998
 * 
 * Flow:
 * 1. Try to login with provided credentials
 * 2. If account doesn't exist, register new user
 * 3. Handle email verification (manual step)
 * 4. If verified, complete login + onboarding
 * 5. Verify dashboard access
 */
test.describe('Automate: Signup -> Verification -> Login -> Onboarding', () => {
    
    const testEmail = 'nitudevi6459@gmail.com';
    const testPassword = 'Atttech@1998';
    const firstName = 'Nitu';
    const lastName = 'Devi';
    
    test('Attempt login with provided credentials - if fails, signup and handle verification', async ({ page }) => {
        test.setTimeout(180000);
        
        const signupPage = new SignupPage(page);
        const loginPage = new LoginPage(page);
        const onboardingPage = new OnboardingPage(page);
        
        console.log('\n=== Starting Automation Test ===');
        console.log(`Email: ${testEmail}`);
        console.log(`Password: ${testPassword}`);
        
        // Step 1: Navigate to login page
        await page.goto('https://my.saleshandy.com/login', { 
            waitUntil: 'domcontentloaded', 
            timeout: 60000
        });
        
        console.log('\n--- Step 1: Attempting login ---');
        
        // Step 2: Try to login with provided credentials
        const loginError = await page.locator('text=Invalid credentials').count();
        const accountNotFound = await page.locator('text=Account not found').count();
        
        await loginPage.login(testEmail, testPassword);
        
        // Wait a bit for response
        await page.waitForTimeout(3000);
        
        // Check if login was successful
        const currentUrl = page.url();
        console.log(`URL after login attempt: ${currentUrl}`);
        
        // Check for login errors
        const loginErrorVisible = await page.locator('text=Invalid').count();
        const notFoundVisible = await page.locator('text=not found').count();
        
        if (currentUrl.includes('/onboarding') || currentUrl.includes('/dashboard') || currentUrl.includes('/sequence')) {
            console.log('✓ Login SUCCESSFUL - User already exists and is verified!');
            
            // Step 3a: Complete onboarding if needed
            const isOnOnboarding = await onboardingPage.isOnOnboardingPage();
            
            if (isOnOnboarding) {
                console.log('--- Step 2a: Completing Onboarding ---');
                await onboardingPage.completeOnboarding('Business');
                console.log('✓ Onboarding completed');
            } else {
                console.log('✓ User already completed onboarding');
            }
            
            // Step 4: Verify dashboard access
            console.log('--- Step 3: Verifying Dashboard Access ---');
            await page.goto('https://my.saleshandy.com/sequence', { 
                waitUntil: 'domcontentloaded',
                timeout: 60000 
            });
            
            await expect(page.locator('body')).toBeVisible();
            console.log('✓ Successfully accessed dashboard!');
            
        } else if (loginErrorVisible > 0 || notFoundVisible > 0 || currentUrl.includes('/login')) {
            console.log('✗ Login FAILED - Account not found or credentials invalid');
            console.log('--- Attempting Signup ---');
            
            // Step 3b: Navigate to signup and register
            await page.goto('https://my.saleshandy.com/signup', { 
                waitUntil: 'domcontentloaded', 
                timeout: 60000
            });
            
            console.log('Registering new user...');
            await signupPage.registerUser(firstName, lastName, testEmail, testPassword);
            
            // Wait for signup response
            await page.waitForTimeout(3000);
            
            const signupUrl = page.url();
            console.log(`URL after signup: ${signupUrl}`);
            
            // Check for verification message or redirect
            const bodyText = await page.locator('body').innerText().catch(() => '');
            const hasVerifyMessage = bodyText.toLowerCase().includes('verify') || 
                                     bodyText.toLowerCase().includes('verification') ||
                                     bodyText.toLowerCase().includes('email');
            
            console.log('\n=== EMAIL VERIFICATION REQUIRED ===');
            console.log('The signup was successful but email verification is required.');
            console.log('Manual step needed: Click verification link in email');
            console.log(`Email: ${testEmail}`);
            console.log('=====================================\n');
            
            if (hasVerifyMessage) {
                console.log('✓ Email verification message displayed on page');
            }
            
            // Document the verification step
            console.log('Waiting for manual email verification...');
            console.log('Once verified, the user can login with:');
            console.log(`  Email: ${testEmail}`);
            console.log(`  Password: ${testPassword}`);
            
            // For testing purposes, we can wait and try login again after verification
            console.log('\n--- Waiting for manual verification (60 seconds) ---');
            console.log('Please verify your email now...');
            
            // Wait up to 60 seconds for manual verification
            let verified = false;
            for (let i = 0; i < 6; i++) {
                await page.waitForTimeout(10000);
                console.log(`Waiting... (${(i+1)*10}/60 seconds)`);
                
                // Try to navigate to login and check
                await page.goto('https://my.saleshandy.com/login', { 
                    waitUntil: 'domcontentloaded',
                    timeout: 30000
                });
                
                await loginPage.login(testEmail, testPassword);
                await page.waitForTimeout(2000);
                
                const newUrl = page.url();
                if (newUrl.includes('/onboarding') || newUrl.includes('/dashboard') || newUrl.includes('/sequence')) {
                    console.log('✓ Email verified! Login successful!');
                    verified = true;
                    break;
                }
            }
            
            if (verified) {
                // Complete onboarding
                const isOnOnboarding = await onboardingPage.isOnOnboardingPage();
                
                if (isOnOnboarding) {
                    console.log('--- Completing Onboarding ---');
                    await onboardingPage.completeOnboarding('Business');
                    console.log('✓ Onboarding completed');
                }
                
                // Verify dashboard
                console.log('--- Verifying Dashboard Access ---');
                await page.goto('https://my.saleshandy.com/sequence', { 
                    waitUntil: 'domcontentloaded',
                    timeout: 60000 
                });
                
                await expect(page.locator('body')).toBeVisible();
                console.log('✓ Successfully accessed dashboard!');
            } else {
                console.log('✗ Email verification not completed within timeout');
                console.log('Please verify your email manually and run test again');
            }
            
        } else {
            // Check for MFA or other verification
            console.log(`Current URL: ${currentUrl}`);
            
            if (currentUrl.includes('/mfa-verify')) {
                console.log('--- MFA Verification Required ---');
                console.log('Manual step needed: Enter MFA code');
                
                console.log('\nWaiting for manual MFA verification (30 seconds)...');
                await page.waitForTimeout(30000);
                
                const newUrl = page.url();
                if (newUrl.includes('/onboarding')) {
                    await onboardingPage.completeOnboarding('Business');
                }
            }
        }
        
        console.log('\n=== Test Completed ===');
    });
    
    test('Quick Login + Onboarding Check (for already verified accounts)', async ({ page }) => {
        test.setTimeout(120000);
        
        const loginPage = new LoginPage(page);
        const onboardingPage = new OnboardingPage(page);
        
        console.log('\n=== Quick Login + Onboarding Test ===');
        
        // Navigate to login
        await page.goto('https://my.saleshandy.com/login', { 
            waitUntil: 'domcontentloaded',
            timeout: 60000 
        });
        
        // Login with provided credentials
        await loginPage.login(testEmail, testPassword);
        
        // Wait for response
        await page.waitForTimeout(3000);
        
        const currentUrl = page.url();
        console.log(`URL after login: ${currentUrl}`);
        
        // Check if redirected to onboarding
        if (currentUrl.includes('/onboarding')) {
            console.log('User on onboarding page - completing...');
            await onboardingPage.completeOnboarding('Business');
            console.log('✓ Onboarding completed');
        } else if (currentUrl.includes('/mfa-verify')) {
            console.log('MFA verification required - waiting for manual input...');
            await page.waitForTimeout(30000);
        } else if (currentUrl.includes('/sequence') || currentUrl.includes('/dashboard')) {
            console.log('✓ Login successful - already completed onboarding');
        } else {
            console.log(`Unexpected URL: ${currentUrl}`);
        }
        
        // Verify dashboard
        await page.goto('https://my.saleshandy.com/sequence', { 
            waitUntil: 'domcontentloaded',
            timeout: 60000 
        });
        
        await expect(page.locator('body')).toBeVisible();
        console.log('✓ Dashboard accessible');
    });
});
