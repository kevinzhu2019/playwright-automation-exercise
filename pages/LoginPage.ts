import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
    private readonly page: Page;
    private readonly loginBtn: Locator;
    public readonly logoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginBtn = page.locator("//a[@href='/login']");
        this.logoutBtn = page.locator("//a[@href='/logout']");
    }

    async open(): Promise<void> {
        await this.page.goto('/');
    }

    async gotoLoginPage() {
        await this.loginBtn.click();
    }

    async login(email: string, password: string) {
        await this.page.locator("//input[@data-qa='login-email']").fill(email);
        await this.page.locator("//input[@data-qa='login-password']").fill(password);
        await this.page.locator("//button[@data-qa='login-button']").click();
    }
}