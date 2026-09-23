import { test as setup, expect } from '@playwright/test';
import usersData from '../test-data/users.json';
import { LoginPage } from '../pages/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.gotoLoginPage();
    await loginPage.login(usersData[0].email, usersData[0].password);
    await expect(loginPage.loggedInUser).toBeVisible();

    await page.context().storageState({ path: authFile });
})