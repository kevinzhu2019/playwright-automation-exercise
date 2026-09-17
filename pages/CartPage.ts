import { type Locator, type Page } from "@playwright/test";

export class CartPage {
    private readonly page: Page;
    public readonly productTbl: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTbl = this.page.locator("//table[@id='cart_info_table']");
    }
}