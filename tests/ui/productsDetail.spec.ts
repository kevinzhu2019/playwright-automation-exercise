import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { ProductsDetailsPage } from '../../pages/ProductsDetailsPage';
import { HomePage } from '../../pages/HomePage';
import { TestUtils } from '../../utils/TestUtils';
import productsData from '../../test-data/products.json';

test('Verify products details page.', async({page}) => {

    test.setTimeout(360000);

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const productsDetailsPage = new ProductsDetailsPage(page);
    const homePage = new HomePage(page);

    // Login to the website and navigate to products page
    await test.step("Login to the website and navigate to products page.", async() => {
        // Navigate to the products page
        await loginPage.open();
        await TestUtils.closeAdPopup(page);
        await homePage.gotoTopBannerPage("Products");
        await TestUtils.closeAdPopup(page);
    })

    // Verify products detail info and review function
    for (const product of productsData) {
        await test.step(`Verify product details information and review - ${product.name}`, async() => {
            await productsPage.navToProductDetail(product.name);
            await TestUtils.closeAdPopup(page);
            // Verify product name        
            await expect(productsDetailsPage.productName).toHaveText(product.name);
            // Verify product price
            await expect(productsDetailsPage.price).toHaveText(product.price, { timeout: 4000 });
            // Verify add to cart button
            await expect(productsDetailsPage.addToCartBtn).toBeVisible();
            // Verify product availability
            await expect(productsDetailsPage.availability).toContainText(product.availability);
            // Verify product condition
            await expect(productsDetailsPage.condition).toContainText(product.condition);
            // Verify product brand
            await expect(productsDetailsPage.brand).toContainText(product.brand);
            // Validate review section from product details page
            const name = `customer_${product.name}`;
            const email = TestUtils.generateRandomString(5) + "_customer_email@gmail99.com";
            const content = `Very good product - ${product.name}`;
            await productsDetailsPage.fillInReviewInfo(name, email, content);
            // Verify review is saved successfully
            await expect(productsDetailsPage.reviewSuccessfulMsg).toBeVisible();
            // await expect(productsDetailsPage.reviewSuccessfulMsg).not.toBeVisible({ timeout: 5000 });
            // Navigate back to product list page
            await homePage.gotoTopBannerPage("Products");
            await TestUtils.closeAdPopup(page);
        });
    }
})