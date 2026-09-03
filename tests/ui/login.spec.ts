import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('john.doe@example.com', 'password123');
});
