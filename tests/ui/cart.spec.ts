import { expect, test } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { HomePage } from '../../pages/HomePage';
import { CartPage } from '../../pages/CartPage';
import usersData from '../../test-data/users.json';
import productsAddToCartData from '../../test-data/productsAddToCart.json';

test('Verify cart page.', async({page}) => {
    const productsPage = new ProductsPage(page);
    const homePage = new HomePage(page);

    // Verify product overlay and then add product to cart
    for (const product of productsAddToCartData) {
        await test.step(`Verify overlay and add to cart for product - ${product.name}`, async() => {
            for (let i = 0; i < product.quantity; i++) {
                // Move mouse to product
                productsPage.hoverToProduct(product.name);
                // Verify product name, price and 'Add to Cart' button
                const overlayProductName = page.locator(`//div[@class='overlay-content']/p[text()='${product.name}']`);
                const priceLocator = page.locator(`//div[@class='overlay-content']/p[text()='${product.name}']/parent::div/p`);
                const overlayAddtoCartBtn = page.locator(`//div[@class='overlay-content']/p[text()='${product.name}']/parent::div/a[text()='Add to cart']`);
                await expect(overlayProductName).toBeVisible();
                await expect(priceLocator).toHaveText(product.price);
                await expect(overlayAddtoCartBtn).toBeVisible();
                productsPage.addProductToCart(product.name);
                // Verify Add to cart overlay
                await expect(productsPage.productAddedModal).toBeVisible();
                await productsPage.continueShoppingBtnModal.click();
            }
        })
    }
    
    // Navigate to Cart page
    await test.step('Navigate to Cart page.', async() => {
        homePage.gotoTopBannerPage("Cart");
    })
    
    // Verify cart page
    for (const product of productsAddToCartData) {
        await test.step(`Verify product ${product.name} is listed in the table of cart page.`, async() => {
            const locator = `//table[@id='cart_info_table']/tbody/tr//a[text()='${product.name}']/parent::h4/parent::td/parent::tr/td[3]/p[text()='${product.price}']/parent::td/parent::tr/td[4]/button[text()='${product.quantity}']/parent::td/parent::tr/td[5]/p[text()='${product.totalPrice}']/parent::td/parent::tr/td[6]/a`;
            await expect(page.locator(locator)).toBeVisible();
        })
    }

})