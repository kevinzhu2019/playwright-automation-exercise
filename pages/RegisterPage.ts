import { type Locator, type Page } from '@playwright/test';

export class RegisterPage {
    private readonly page: Page;
    private readonly newUserSignupBtn: Locator;
    private readonly newUserName: Locator;
    private readonly newUserEmail: Locator;
    private readonly signupBtn: Locator;

    constructor(page: Page) {
        this.page = page;

        this.newUserSignupBtn = page.locator("//button[@data-qa='signup-button']");
        this.newUserName = page.locator("//input[@data-qa='signup-name']");
        this.newUserEmail = page.locator("//input[@data-qa='signup-email']");
        this.signupBtn = page.locator("//button[@data-qa='signup-button']");
    }

    async signup(name: string, email: string) {
        await this.newUserName.fill(name);
        await this.newUserEmail.fill(email);
        await this.signupBtn.click();
    }
}