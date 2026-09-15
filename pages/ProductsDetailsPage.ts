import { type Locator, type Page } from "@playwright/test";

export class ProductsDetailsPage {
    private readonly page: Page;
    public readonly productName: Locator;
    public readonly price: Locator;
    public readonly quantityInput: Locator;
    public readonly addToCartBtn: Locator;
    public readonly availability: Locator;
    public readonly condition: Locator;
    public readonly brand: Locator;

    constructor(page: Page) {
        this.page = page;
        this. productName = page.locator("//div[@class='product-information']//h2");
        this.price = page.locator("//div[@class='product-information']//span/span");
        this.quantityInput = page.locator("//input[@id='quantity']");
        this.addToCartBtn = page.locator("//button[@class='btn btn-default cart']");
        this.availability = page.locator("//div[@class='product-information']/p/b[normalize-space()='Availability:']/parent::p");
        this.condition = page.locator("//div[@class='product-information']/p/b[normalize-space()='Condition:']/parent::p");
        this.brand = page.locator("//div[@class='product-information']/p/b[normalize-space()='Brand:']/parent::p");
    }

    // Update product quantity
    async updateQuantity(num: string) {
        await this.quantityInput.fill(num);
    }
}