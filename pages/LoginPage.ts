import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
    private readonly page: Page;
    private readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;

        this.loginBtn = page.locator("//a[@href='/login']");
    }

    async open(): Promise<void> {
        await this.page.goto('/');
    }

    async gotoLoginPage() {
        await this.loginBtn.click();
    }
}