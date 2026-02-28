Playwright Automation Task: Saleshandy Sign-up & Onboarding
📌 Project Overview
This project automates the sign-up and onboarding flows for the Saleshandy application. The solution is designed to handle three distinct account types—Personal Use, Business, and Clients—using a single, parameterized automation script.


🛠️ Tools & Technologies

Framework: Playwright 


Language: TypeScript/JavaScript 


Pattern: Page Object Model (POM) 

Test Runner: Playwright Test


Version Control: Git/GitHub 

 Framework Structure
The project follows a clean, modular folder structure for maintainability:

/tests: Contains the test scripts (Personal, Business, Client scenarios).

/pages: Contains Page Object classes for the Sign-up and Onboarding pages.


/data: JSON or configuration files for parameterized account data.


/utils: Helper functions and global setup for authentication.

 Getting Started
Prerequisites
Node.js (v16 or higher)

npm or yarn

Installation
Clone the repository:

Bash
git clone https://github.com/Anj0210/playwright-task.git
Navigate to the directory:

Bash
cd playwright-task
Install dependencies:

Bash
npm install
Install Playwright Browsers:

Bash
npx playwright install
Running Tests
To run all tests:

Bash
npx playwright test
💡 Implementation Details
Parameterized Sign-up 

Instead of creating separate scripts for each user type, I implemented a generic sign-up function that accepts accountType as a parameter. Based on this input, the script dynamically:

Selects the correct sign-up form.

Executes the specific onboarding flow.

Validates UI elements unique to that account type.



Reuse: Subsequent tests reuse this state to bypass the login screen, ensuring faster and more stable execution.

📝 Assumptions & Notes 

Email Handling: Assumed the use of unique/dynamic emails for each sign-up run to avoid "Email already exists" errors.

Onboarding Steps: Assumed specific UI selectors for "Business" vs "Client" based on the application's current DO
