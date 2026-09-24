import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../pages/CheckoutPage';

test ('Get all products list.', async({ page, request }) => {
    const checkoutPage = new CheckoutPage(page);

    const response = await request.get('https://automationexercise.com/api/productsList');

    // 1. HTTP response
    expect (response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);

    // 2. Response body
    expect(responseBody.responseCode).toBe(200);

    // 3. Response data structure
    expect(Array.isArray(responseBody.products)).toBe(true);
    expect(responseBody.products.length).toBeGreaterThan(0);

    // 4. Actual product data
    expect(responseBody.products[0].id).toBe(1);
    expect(responseBody.products[0].name).toBe('Blue Top');
    expect(responseBody.products[0].price).toBe('Rs. 500');
    expect(responseBody.products[0].brand).toBe('Polo');

    const product = responseBody.products.find(
        (product: any) => product.name === 'Blue Top'
    );

    // 5. Verify specific object
    expect(product).toBeDefined();
    expect(product.id).toBe(1);
    expect(product.name).toBe('Blue Top');
    expect(product.price).toBe('Rs. 500');
    expect(product.brand).toBe('Polo');

    // // Verify response practice
    // test.step('This is the practice for API responce check after user clicks Submit button', async() => {
    //     const response = await checkoutPage.clickSubmitResponse();
    //     expect(response.status()).toBe(200);
    //     const responseBody = await response.json();
    //     expect(responseBody.responseCode).toBe(200);
    //     // Verify UI
    //     await expect(page.getByText('Success')).toBeVisible();
    // })

})