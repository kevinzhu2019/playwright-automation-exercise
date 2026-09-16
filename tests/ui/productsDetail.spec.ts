import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { ProductsDetailsPage } from '../../pages/ProductsDetailsPage';
import { TestUtils } from '../../utils/TestUtils';
import productsData from '../../test-data/products.json';

test('Verify products details page.', async({page}) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const productsDetailsPage = new ProductsDetailsPage(page);

    // Login to the website and navigate to products page
    await test.step("Login to the website and navigate to products page.", async() => {
        await loginPage.open();
        await loginPage.gotoLoginPage();
        await loginPage.login('kkk1234567@gmail99.com', '1234567');
        // Navigate to the products page
        await productsPage.gotoProductsPage();
    })

    // Verify products detail info and review function
    for (const product of productsData) {
            await test.step(`Verify product details information and review - ${product.name}`, async() => {
                await productsPage.navToProductDetail(product.name);
                // Verify product name        
                await expect(productsDetailsPage.productName).toHaveText(product.name);
                // Verify product price
                await expect(productsDetailsPage.price).toHaveText(product.price);
                // Verify add to cart button
                await expect(productsDetailsPage.addToCartBtn).toBeVisible();
                // Verify product availability
                await expect(productsDetailsPage.availability).toHaveText(product.availability);
                // Verify product condition
                await expect(productsDetailsPage.condition).toHaveText(product.condition);
                // Verify product brand
                await expect(productsDetailsPage.brand).toContainText(product.brand);
                // Validate review section from product details page
                const name = `customer_${product.name}`;
                const email = TestUtils.generateRandomString(5) + "_customer_email@gmail99.com";
                const content = `Very good product - ${product.name}`;
                await productsDetailsPage.fillInReviewInfo(name, email, content);
                // Verify review is saved successfully
                await expect(productsDetailsPage.reviewSuccessfulMsg).toBeVisible();
                await expect(productsDetailsPage.reviewSuccessfulMsg).not.toBeVisible();
                // Navigate back to product list page
                await productsPage.gotoProductsPage();
            });
    }
})