import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import userData from '../../test-data/users.json';

test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.gotoLoginPage();
    await loginPage.login(userData[0].email, userData[0].password);
});
