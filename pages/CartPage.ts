import { type Locator, type Page, expect } from "@playwright/test";

export class CartPage {
    private readonly page: Page;
    public readonly productTbl: Locator;
    public readonly checkoutBtn: Locator;
    public readonly itemDeleteBtns: Locator;
    public readonly emptyCartWarning: Locator;
    public readonly emptyCartWarningLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTbl = page.locator("//table[@id='cart_info_table']");
        this.checkoutBtn = page.locator("//a[normalize-space()='Proceed To Checkout']");
        this.itemDeleteBtns = page.locator("//tbody//td[@class='cart_delete']/a");
        this.emptyCartWarning = page.locator("//span[@id='empty_cart']/p");
        this.emptyCartWarningLink = page.locator("//span[@id='empty_cart']/p/a/u");
    }

    // Click on Proceed to checkout button
    async clickCheckoutBtn() {
        await this.checkoutBtn.click();
    }

    // Clear cart
    async clearCart() {
        let count = await this.itemDeleteBtns.count();
        console.log(`Initial cart items: ${count}`);
        while (count > 0) {
            console.log(`Deleting item. Remaining: ${count}`);
            await this.itemDeleteBtns.first().click();
            count--;
            await expect(this.itemDeleteBtns).toHaveCount(count, { timeout: 15000 });
        }
        console.log("Cart cleared successfully.");
    }

}