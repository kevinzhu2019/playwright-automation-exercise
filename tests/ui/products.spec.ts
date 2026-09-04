import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test('Verify that the user can navigate to the products page', async ({ page }) => {
    // Login with a valid user account
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.open();
    await loginPage.gotoLoginPage();
    await loginPage.login('kkk1234567@gmail99.com', '1234567');
    await expect(loginPage.loggedInUser).toBeVisible();

    // Navigate to the products page
    await productsPage.gotoProductsPage();


})