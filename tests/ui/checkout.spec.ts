import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import usersData from '../../test-data/users.json';
import productsAddToCartData from '../../test-data/productsAddToCart.json';

test('Test checkout function.', async({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login to the website and navigate to products page
    await test.step("Login to the website and navigate to products page.", async() => {
        // Navigate to the products page
        await homePage.gotoTopBannerPage("Products");
    })

    // Verify product overlay and then add product to cart
    for (const product of productsAddToCartData) {
        await test.step(`Verify overlay and add to cart for product - ${product.name}`, async() => {
            for (let i = 0; i < product.quantity; i++) {
                // Move mouse to product
                productsPage.hoverToProduct(product.name);
                productsPage.addProductToCart(product.name);
                await productsPage.continueShoppingBtnModal.click();
            }
        })
    }
    
    // Navigate to Cart page
    await test.step('Navigate to Cart page.', async() => {
        homePage.gotoTopBannerPage("Cart");
    })

    // Navigate to checkout page
    await test.step('Click on checkout button.', async() => {
        cartPage.clickCheckoutBtn();
    })

    // Verify UI from Checkout page
    await test.step('Verify UI from checkout page.', async() => {
        await expect(checkoutPage.deliveryAddrSubheading).toHaveText("Your delivery address");
        await expect(checkoutPage.deliveryAddrLN).toHaveText(usersData[0].deliveryLastname);
        await expect(checkoutPage.deliveryAddr1).toHaveText(usersData[0].deliveryAddr1);
        await expect(checkoutPage.deliveryAddr2).toHaveText(usersData[0].deliveryAddr2);
        await expect(checkoutPage.deliveryAddrCityPostalCode).toContainText(usersData[0].deliveryCity);
        await expect(checkoutPage.deliveryAddrCityPostalCode).toContainText(usersData[0].deliveryProvince);
        await expect(checkoutPage.deliveryAddrCityPostalCode).toContainText(usersData[0].deliveryPostalcode);
        await expect(checkoutPage.deliveryAddrCountry).toContainText(usersData[0].deliveryCountry);
        await expect(checkoutPage.deliveryAddrPhone).toContainText(usersData[0].deliveryPhone);

        await expect(checkoutPage.billingAddrSubheading).toHaveText("Your billing address");
        await expect(checkoutPage.billingAddrLN).toHaveText(usersData[0].invoiceLastname);
        await expect(checkoutPage.billingAddr1).toHaveText(usersData[0].invoiceAddr1);
        await expect(checkoutPage.billingAddr2).toHaveText(usersData[0].invoiceAddr2);
        await expect(checkoutPage.billingAddrCityPostalCode).toContainText(usersData[0].invoiceCity);
        await expect(checkoutPage.billingAddrCityPostalCode).toContainText(usersData[0].invoiceProvince);
        await expect(checkoutPage.billingAddrCityPostalCode).toContainText(usersData[0].invoicePostalcode);
        await expect(checkoutPage.billingAddrCountry).toContainText(usersData[0].invoiceCountry);
        await expect(checkoutPage.billingAddrPhone).toContainText(usersData[0].invoicePhone);
    })
})