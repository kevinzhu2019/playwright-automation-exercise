import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { ProductsApi } from '../../api/productsApi';

test ('Verify Products and Brands API endpoint.', async({ page, request }) => {

    const checkoutPage = new CheckoutPage(page);
    const productsApi = new ProductsApi(request);

    await test.step('Get all products list.', async() => {
        const response = await productsApi.verifyProductsApi();
        // Assertions
        // 1. HTTP response
        expect (response.status()).toBe(200);
        const responseBody = await response.json();
        console.log('Products response body is: ', responseBody);
        // 2. Response body
        expect(responseBody.responseCode).toBe(200);
        // 3. Response data structure
        expect(Array.isArray(responseBody.products)).toBe(true);
        expect(responseBody.products.length).toBe(34);
        // 4. Actual product data
        expect(responseBody.products[0].id).toBe(1);
        expect(responseBody.products[0].name).toBe('Blue Top');
        expect(responseBody.products[0].price).toBe('Rs. 500');
        expect(responseBody.products[0].brand).toBe('Polo');

        expect(responseBody.products[1].id).toBe(2);
        expect(responseBody.products[1].name).toBe('Men Tshirt');
        expect(responseBody.products[1].price).toBe('Rs. 400');
        expect(responseBody.products[1].brand).toBe('H&M');

        expect(responseBody.products[2].id).toBe(3);
        expect(responseBody.products[2].name).toBe('Sleeveless Dress');
        expect(responseBody.products[2].price).toBe('Rs. 1000');
        expect(responseBody.products[2].brand).toBe('Madame');
        // 5. Verify specific object
        const product = responseBody.products.find(
            (product: any) => product.name === 'Blue Top'
        );
        expect(product).toBeDefined();
        expect(product.id).toBe(1);
        expect(product.name).toBe('Blue Top');
        expect(product.price).toBe('Rs. 500');
        expect(product.brand).toBe('Polo');

        const product2 = responseBody.products.find(
            (product: any) => product.name === 'Men Tshirt'
        );
        expect(product2).toBeDefined();
        expect(product2.id).toBe(2);
        expect(product2.name).toBe('Men Tshirt');
        expect(product2.price).toBe('Rs. 400');
        expect(product2.brand).toBe('H&M');
    })

    await test.step('Post to all products list which is suppose to fail.', async() => {
        const response = await productsApi.postAllProductsApi();
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log('Post products response body is: ', responseBody);
        // Assertion
        expect(responseBody.responseCode).toBe(405);
        expect(responseBody.message).toBe('This request method is not supported.')
    })

    await test.step('Get all brands list.', async() => {
        const response = await productsApi.verifyBrandsApi();
        const responseBody = await response.json();
        console.log('Brands response body is: ', responseBody);
        // Assertions
        expect (response.status()).toBe(200);
        const brand = responseBody.brands.find(
            (brand: any) => brand.id === 1
        );
        expect(brand).toBeDefined();
        expect(brand.brand).toBe('Polo');
        
        expect (response.status()).toBe(200);
        const brand2 = responseBody.brands.find(
            (brand: any) => brand.id === 2
        );
        expect(brand2).toBeDefined();
        expect(brand2.brand).toBe('H&M');

        expect (response.status()).toBe(200);
        const brand3 = responseBody.brands.find(
            (brand: any) => brand.id === 3
        );
        expect(brand3).toBeDefined();
        expect(brand3.brand).toBe('Madame');

        expect (response.status()).toBe(200);
        const brand4 = responseBody.brands.find(
            (brand: any) => brand.id === 4
        );
        expect(brand4).toBeDefined();
        expect(brand4.brand).toBe('Madame');

        expect (response.status()).toBe(200);
        const brand5 = responseBody.brands.find(
            (brand: any) => brand.id === 5
        );
        expect(brand5).toBeDefined();
        expect(brand5.brand).toBe('Mast & Harbour');

        expect (response.status()).toBe(200);
        const brand6 = responseBody.brands.find(
            (brand: any) => brand.id === 6
        );
        expect(brand6).toBeDefined();
        expect(brand6.brand).toBe('H&M');

        expect (response.status()).toBe(200);
        const brand11 = responseBody.brands.find(
            (brand: any) => brand.id === 11
        );
        expect(brand11).toBeDefined();
        expect(brand11.brand).toBe('Babyhug');

        expect (response.status()).toBe(200);
        const brand13 = responseBody.brands.find(
            (brand: any) => brand.id === 13
        );
        expect(brand13).toBeDefined();
        expect(brand13.brand).toBe('Allen Solly Junior');
    })

    await test.step('Put to all brands list which is suppose to fail.', async() => {
        const response = await productsApi.putAllBrandsApi();
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log('Put brands response body is: ', responseBody);
        // Assertion
        expect(responseBody.responseCode).toBe(405);
        expect(responseBody.message).toBe('This request method is not supported.')
    })

    await test.step('Post to search products API.', async() => {
        const response = await productsApi.postSearchProductsApi("Tshirt");
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log('Search products response body is: ', responseBody);
        // Assertion
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.products.length).toBeGreaterThan(0)
        // verify products name includes "Tshirt"
        const product = responseBody.products.find(
            (product: any) => product.name.includes("Tshirt")
        );
        expect(product).toBeDefined();
        expect(product.name).toContain("Tshirt");
    })

    await test.step('Post to search products API with no search product parameter.', async() => {
        const response = await productsApi.postSearchProductsApiEmpty();
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log('Search products with empty keyword parameter response body is: ', responseBody);
        // Assertion
        expect(responseBody.responseCode).toBe(400);
        expect(responseBody.message).toBe('Bad request, search_product parameter is missing in POST request.')
    })

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