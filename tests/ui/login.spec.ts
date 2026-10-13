import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import userData from '../../test-data/users.json';

// Override StorageState since this is registration tests do not need to load storage state
test.use({
    storageState: {
        cookies: [],
        origins: []
    }
});

test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.gotoLoginPage();
    await loginPage.login(userData[0].email, userData[0].password);
});
