import { type Locator, type Page } from "@playwright/test";

export class CartPage {
    private readonly page: Page;
    public readonly productTbl: Locator;
    public readonly checkoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTbl = page.locator("//table[@id='cart_info_table']");
        this.checkoutBtn = page.locator("//a[normalize-space()='Proceed To Checkout']");
    }

    // Click on Proceed to checkout button
    async clickCheckoutBtn() {
        await this.checkoutBtn.click();
    }

}