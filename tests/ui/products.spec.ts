import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test('Verify that the user can navigate to the products page', async ({ page }) => {
    // Login with a valid user account
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // Login to the website and navigate to products page
    await test.step("Login to the website and navigate to products page.", async() => {
        await loginPage.open();
        await loginPage.gotoLoginPage();
        await loginPage.login('kkk1234567@gmail99.com', '1234567');
        await expect(loginPage.loggedInUser).toBeVisible();
        // Navigate to the products page
        await productsPage.gotoProductsPage();
    })
    
    // Verify UI
    await test.step("Veify UI", async() => {
        // Verify UI - Onsale image
        await expect(productsPage.onSale).toBeVisible();
        // Verify UI - Search box
        await expect(productsPage.searchInput).toBeVisible();
        await expect(productsPage.searchBtn).toBeVisible();
        // Verify UI - Category section
        await expect(productsPage.leftSideBarCat).toBeVisible();
        // Verify UI - Brands section
        await expect(productsPage.leftSideBarBrands).toBeVisible();
        // Verify UI - All products section
        await expect(productsPage.allProducts).toBeVisible();
    })
    

    // Verify Category expansion
    const categories = ["Women", "Men", "Kids"];
    for (const category of categories) {
        await test.step(`Verify Category expansion: ${category}`, async() => {
            await productsPage.clickCategoryExpansion(category);
            if (category == "Women") {
                await expect(productsPage.catWomanDress).toBeVisible();
                await expect(productsPage.catWomanTops).toBeVisible();
                await expect(productsPage.catWomanSaree).toBeVisible();
            } else if (category == "Men") {
                await expect(productsPage.catMenTshirts).toBeVisible();
                await expect(productsPage.catMenJeans).toBeVisible();
            } else if (category == "Kids") {
                await expect(productsPage.catKidsDress).toBeVisible();
                await expect(productsPage.catKidsTopsShirts).toBeVisible();
            }
        })
    }

    // Verify Brands list
    await test.step("Verify Brands list", async() => {
        await expect(productsPage.brands).toBeVisible();
        await expect(productsPage.brandPolo).toBeVisible();
        await expect(productsPage.brandHM).toBeVisible();
        await expect(productsPage.brandMadame).toBeVisible();
        await expect(productsPage.brandMH).toBeVisible();
        await expect(productsPage.brandBabyHug).toBeVisible();
        await expect(productsPage.brandAllenSollyJr).toBeVisible();
        await expect(productsPage.brandKookieKids).toBeVisible();
        await expect(productsPage.brandBiba).toBeVisible();
    })
    
    // Verify each Brand list number
    const brands = [
        "Polo",
        "H&M",
        "Madame",
        "Mast & Harbour",
        "Babyhug",
        "Allen Solly Junior",
        "Kookie Kids",
        "Biba"
    ];
    for (const brand of brands) {
        await test.step(`Verify product count for brand: ${brand}`, async() => {
            await productsPage.clickOnBrand(brand);
            const expectedCount = await productsPage.getProductsListNo(brand);
            await expect(productsPage.brandProductsListNo).toHaveCount(expectedCount);
        })
    }

})