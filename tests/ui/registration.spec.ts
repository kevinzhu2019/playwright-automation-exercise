import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';
import { RegisterInfoPage } from '../../pages/RegisterInfoPage';
import { TestUtils } from '../../utils/TestUtils';

test('Register new user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const registerInfoPage = new RegisterInfoPage(page);

    // Navigate to new user registration page
    await loginPage.open();
    await loginPage.gotoLoginPage();

    // Get the current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0]; 
    // Fill in the registration name and email, then click the signup button
    await registerPage.signup('Kai' + currentDate, TestUtils.generateRandomString(6) + '@gmail99.com');

    // Fill in the account information
    await registerInfoPage.enterAccountInfo('Male', 'Kai', '123456', '1-1-1990', 'Yes', 'Yes');
    await registerInfoPage.enterAddressInfo('Kai', 'Smith', 'Company', '123 Main St', 'Apt 4B', 'United States', 'California', 'Los Angeles', '90001', '1234567890');
    await registerInfoPage.clcikCreateBtn();
})