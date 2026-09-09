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

    // Verify Category expansion
    await productsPage.verifyCategoryExpansion("Women");
    await expect(productsPage.catWomanDress).toBeVisible();
    await expect(productsPage.catWomanTops).toBeVisible();
    await expect(productsPage.catWomanSaree).toBeVisible();
    await productsPage.verifyCategoryExpansion("Men");
    await expect(productsPage.catMenTshirts).toBeVisible();
    await expect(productsPage.catMenJeans).toBeVisible();
    await productsPage.verifyCategoryExpansion("Kids");
    await expect(productsPage.catKidsDress).toBeVisible();
    await expect(productsPage.catKidsTopsShirts).toBeVisible();

    // Verify Brands list
    await expect(productsPage.brands).toBeVisible();
    await expect(productsPage.brandPolo).toBeVisible();
    await expect(productsPage.brandHM).toBeVisible();
    await expect(productsPage.brandMadame).toBeVisible();
    await expect(productsPage.brandMH).toBeVisible();
    await expect(productsPage.brandBabyHug).toBeVisible();
    await expect(productsPage.brandAllenSollyJr).toBeVisible();
    await expect(productsPage.brandKookieKids).toBeVisible();
    await expect(productsPage.brandBiba).toBeVisible();

    // Verify Brand list number - Polo
    await productsPage.clickOnBrand("Polo");
    const poloListNo = await productsPage.getProductsListNo("Polo");
    await expect(productsPage.brandProductsListNo).toHaveCount(poloListNo);
    // Verify brand list number - H&M
    await productsPage.clickOnBrand("H&M");
    const hmListNo = await productsPage.getProductsListNo("H&M");
    await expect(productsPage.brandProductsListNo).toHaveCount(hmListNo);

})