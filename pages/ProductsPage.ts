import { type Locator, type Page } from "@playwright/test";

export class ProductsPage {
    private readonly page: Page;
    private readonly productsHeader: Locator;
    public readonly onSale: Locator;
    public readonly searchInput: Locator;
    public readonly searchBtn: Locator;
    public readonly leftSideBarCat: Locator;
    public readonly leftSideBarBrands: Locator;
    public readonly catWomanDress: Locator;
    public readonly catWomanTops: Locator;
    public readonly catWomanSaree: Locator;
    public readonly catMenTshirts: Locator;
    public readonly catMenJeans: Locator;
    public readonly catKidsDress: Locator;
    public readonly catKidsTopsShirts: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsHeader = page.locator('//a[@href="/products"]');
        this.onSale = page.locator("//img[@src='/static/images/shop/sale.jpg']");
        this.searchInput = page.locator("//input[@id='search_product']");
        this.searchBtn = page.locator("//button[@id='submit_search']");
        this.leftSideBarCat = page.locator("//div[@class='left-sidebar']//h2[normalize-space()='Category']");
        this.leftSideBarBrands = page.locator("//div[@class='left-sidebar']//h2[normalize-space()='Brands']");
        this.catWomanDress = page.locator("//div[@id='Women']//a[text()='Dress ']");
        this.catWomanTops = page.locator("//div[@id='Women']//a[text()='Tops ']");
        this.catWomanSaree = page.locator("//div[@id='Women']//a[text()='Saree ']");
        this.catMenTshirts = page.locator("//div[@id='Men']//a[text()='Tshirts ']");
        this.catMenJeans = page.locator("//div[@id='Men']//a[text()='Jeans ']");
        this.catKidsDress = page.locator("//div[@id='Kids']//a[text()='Dress ']");
        this.catKidsTopsShirts = page.locator("//div[@id='Kids']//a[text()='Tops & Shirts ']");
    }

    async gotoProductsPage() {
        await this.productsHeader.click();
    }

    //Verify products category expansion button
    async verifyCategoryExpansion(catName: string) {
        const catExpendBtn = this.page.locator(`//a[@href='#${catName}']//i`);
        await catExpendBtn.click(); 
    }
}