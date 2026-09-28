import { type Locator, type Page, expect } from "@playwright/test";

export class LogoutPage {
    private readonly page: Page;
    public readonly logoutBtn: Locator;
    public readonly loginBtn: Locator;    

    constructor(page: Page) {
        this.page = page;
        this.logoutBtn = page.locator("//a[@href='/logout']");
        this.loginBtn = page.locator("//a[@href='/login']");
    }

    async clickLogoutBtn() {
        await this.logoutBtn.click();
        await expect(this.loginBtn).toBeVisible();
    }
}                        