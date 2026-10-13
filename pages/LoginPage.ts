import { type Locator, type Page } from "@playwright/test";
import { TestUtils } from "../utils/TestUtils";

export class LoginPage {
    private readonly page: Page;
    private readonly loginBtnTopBanner: Locator;
    public readonly logoutBtnTopBanner: Locator;
    public readonly loggedInUser: Locator;
    public readonly email: Locator;
    public readonly password: Locator;
    public readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginBtnTopBanner = page.locator("//a[@href='/login']");
        this.logoutBtnTopBanner = page.locator("//a[@href='/logout']");
        this.loggedInUser = page.locator("//a[contains(text(),' Logged in as ')]");
        this.email = page.locator("//input[@data-qa='login-email']");
        this.password = page.locator("//input[@data-qa='login-password']");
        this.loginBtn = page.locator("//button[@data-qa='login-button']");
    }

    async open(): Promise<void> {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
        await TestUtils.closeAdPopup(this.page);
    }

    async gotoLoginPage() {
        await this.loginBtnTopBanner.click();
    }

    async login(email: string, password: string) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}