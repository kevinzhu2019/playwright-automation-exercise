import { type Page } from "@playwright/test";

export class HomePage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page; 
    }

    async gotoTopBannerPage(link: string) {
        const topLink = `//ul[@class='nav navbar-nav']/li[contains(normalize-space(),'${link}')]`;
        await this.page.locator(topLink).click();
    }
}