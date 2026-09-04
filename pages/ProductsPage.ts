import { type Locator, type Page } from "@playwright/test";

export class ProductsPage {
    private readonly page: Page;
    private readonly productsHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsHeader = page.locator('//a[@href="/products"]');
    }

    async gotoProductsPage() {
        await this.productsHeader.click();
    }
}