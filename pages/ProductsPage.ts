import { type Locator, type Page } from "@playwright/test";

export class ProductsPage {
    private readonly page: Page;
    private readonly productsHeader: Locator;
    public readonly onSale: Locator;
    public readonly searchInput: Locator;
    public readonly searchBtn: Locator;
    public readonly leftSideBarCat: Locator;
    public readonly leftSideBarBrands: Locator;
    public readonly allProducts: Locator;
    public readonly catWomanDress: Locator;
    public readonly catWomanTops: Locator;
    public readonly catWomanSaree: Locator;
    public readonly catMenTshirts: Locator;
    public readonly catMenJeans: Locator;
    public readonly catKidsDress: Locator;
    public readonly catKidsTopsShirts: Locator;
    public readonly brands: Locator;
    public readonly brandPolo: Locator;
    public readonly brandHM: Locator;
    public readonly brandMadame: Locator;
    public readonly brandMH: Locator;
    public readonly brandBabyHug: Locator;
    public readonly brandAllenSollyJr: Locator;
    public readonly brandKookieKids: Locator;
    public readonly brandBiba: Locator;

    public readonly brandPoloNo: Locator;
    public readonly brandHMNo: Locator;
    public readonly brandMadameNo: Locator;
    public readonly brandMHNo: Locator;
    public readonly brandBabyHugNo: Locator;
    public readonly brandAllenSollyJrNo: Locator;
    public readonly brandKookieKidsNo: Locator;
    public readonly brandBibaNo: Locator;
    public readonly brandProductsListNo: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsHeader = page.locator('//a[@href="/products"]');
        this.onSale = page.locator("//img[@src='/static/images/shop/sale.jpg']");
        this.searchInput = page.locator("//input[@id='search_product']");
        this.searchBtn = page.locator("//button[@id='submit_search']");
        this.leftSideBarCat = page.locator("//div[@class='left-sidebar']//h2[normalize-space()='Category']");
        this.leftSideBarBrands = page.locator("//div[@class='left-sidebar']//h2[normalize-space()='Brands']");
        this.allProducts = page.locator("//div[@class='features_items']//h2[normalize-space()='All Products']");
        this.catWomanDress = page.locator("//div[@id='Women']//a[text()='Dress ']");
        this.catWomanTops = page.locator("//div[@id='Women']//a[text()='Tops ']");
        this.catWomanSaree = page.locator("//div[@id='Women']//a[text()='Saree ']");
        this.catMenTshirts = page.locator("//div[@id='Men']//a[text()='Tshirts ']");
        this.catMenJeans = page.locator("//div[@id='Men']//a[text()='Jeans ']");
        this.catKidsDress = page.locator("//div[@id='Kids']//a[text()='Dress ']");
        this.catKidsTopsShirts = page.locator("//div[@id='Kids']//a[text()='Tops & Shirts ']");
        this.brands = page.locator("//div[@id='accordian']/parent::div/div[@class='brands_products']/h2");
        const polo = "//div[@class='brands-name']/ul/li/a[text()='Polo']";
        this.brandPolo = page.locator(polo);
        this.brandPoloNo = page.locator(polo + "/span");
        const HM = "//div[@class='brands-name']/ul/li/a[text()='H&M']";
        this.brandHM = page.locator(HM);
        this.brandHMNo = page.locator(HM + "/span");
        const madame = "//div[@class='brands-name']/ul/li/a[text()='Madame']";
        this.brandMadame = page.locator(madame);
        this.brandMadameNo = page.locator(madame + "/span");
        const MH = "//div[@class='brands-name']/ul/li/a[text()='Mast & Harbour']";
        this.brandMH = page.locator(MH);
        this.brandMHNo = page.locator(MH + "/span");
        const babyHug = "//div[@class='brands-name']/ul/li/a[text()='Babyhug']";
        this.brandBabyHug = page.locator(babyHug);
        this.brandBabyHugNo = page.locator(babyHug + "/span");
        const allenSollyJr = "//div[@class='brands-name']/ul/li/a[text()='Allen Solly Junior']";
        this.brandAllenSollyJr = page.locator(allenSollyJr);
        this.brandAllenSollyJrNo = page.locator(allenSollyJr + "/span");
        const kookieKids = "//div[@class='brands-name']/ul/li/a[text()='Kookie Kids']";
        this.brandKookieKids = page.locator(kookieKids);
        this.brandKookieKidsNo = page.locator(kookieKids + "/span");
        const biba = "//div[@class='brands-name']/ul/li/a[text()='Biba']";
        this.brandBiba = page.locator(biba);
        this.brandBibaNo = page.locator(biba + "/span");
        this.brandProductsListNo = page.locator("//div[@class='features_items']//div[@class='single-products']");
    }

    async gotoProductsPage() {
        await this.productsHeader.click();
    }

    //Verify products category expansion button
    async verifyCategoryExpansion(catName: string) {
        const catExpendBtn = this.page.locator(`//a[@href='#${catName}']//i`);
        await catExpendBtn.click(); 
    }

    // Click Brand
    async clickOnBrand(brand: string) {
        const brandName = this.page.locator(`//div[@class='brands-name']/ul/li/a[text()='${brand}']`);
        await brandName.click();
    }

    // Get products list number
    async getProductsListNo(product: string): Promise<number> {
        const locator = this.page.locator(`//div[@class='brands-name']/ul/li/a[text()='${product}']/span`);
        const returnStr = await locator.allInnerTexts();
        return Number(returnStr[1]);
    }

}