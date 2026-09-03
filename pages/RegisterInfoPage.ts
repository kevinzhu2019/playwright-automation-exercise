import { type Locator, type Page } from '@playwright/test';
import { stat } from 'node:fs';

export class RegisterInfoPage {
    private readonly page: Page;
    private readonly genderMale: Locator;
    private readonly genderFemale: Locator;
    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly dobDay: Locator;
    private readonly dobMonth: Locator;
    private readonly dobYear: Locator;
    private readonly signupForNew: Locator;
    private readonly receiveSpecialOffer: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly companyInput: Locator;
    private readonly address1Input: Locator;
    private readonly address2Input: Locator;
    private readonly countrySelect: Locator;
    private readonly stateInput: Locator;
    private readonly cityInput: Locator;
    private readonly zipInput: Locator;
    private readonly mobileInput: Locator;
    private readonly createAccountBtn: Locator;
    private readonly subscriptionEmail: Locator;
    private readonly subscribeBtn: Locator;
    public readonly accountCreated: Locator;
    private readonly continueBtn: Locator;

    constructor(page: Page) {
        this.page = page;

        this.genderMale = page.locator("//input[@id='id_gender1']");
        this.genderFemale = page.locator("//input[@id='id_gender2']");
        this.nameInput = page.locator("//input[@id='name']");
        this.emailInput = page.locator("//input[@id='email']");
        this.passwordInput = page.locator("//input[@id='password']");
        this.dobDay = page.locator("//select[@id='days']");
        this.dobMonth = page.locator("//select[@id='months']");
        this.dobYear = page.locator("//select[@id='years']");
        this.signupForNew = page.locator("//input[@id='newsletter']");
        this.receiveSpecialOffer = page.locator("//input[@id='optin']");

        // Address form
        this.firstNameInput = page.locator("//input[@id='first_name']");
        this.lastNameInput = page.locator("//input[@id='last_name']");
        this.companyInput = page.locator("//input[@id='company']");
        this.address1Input = page.locator("//input[@id='address1']");
        this.address2Input = page.locator("//input[@id='address2']");
        this.countrySelect = page.locator("//select[@id='country']");
        this.stateInput = page.locator("//input[@id='state']");
        this.cityInput = page.locator("//input[@id='city']");
        this.zipInput = page.locator("//input[@id='zipcode']");
        this.mobileInput = page.locator("//input[@id='mobile_number']");
        this.createAccountBtn = page.locator("//button[@data-qa='create-account']");

        this.subscriptionEmail = page.locator("//input[@id='susbscribe_email']");
        this.subscribeBtn = page.locator("//button[@id='subscribe']");

        this.accountCreated = page.locator("//b[text()='Account Created!']");
        this.continueBtn = page.locator("//a[@data-qa='continue-button']");
    }

    async enterAccountInfo(sex: string, name: string, password: string, dob: string, newsletter: string, specialOffer: string) {
        sex == 'Male' ? await this.genderMale.check() : await this.genderFemale.check();
        await this.nameInput.fill(name);
        await this.passwordInput.fill(password);
        await this.dobDay.selectOption(dob.split("-")[0]);
        await this.dobMonth.selectOption(dob.split("-")[1]);
        await this.dobYear.selectOption(dob.split("-")[2]);
        newsletter == 'Yes' ? await this.signupForNew.check() : await this.receiveSpecialOffer.check();
    }

    async enterAddressInfo(fn: string, ln: string, company: string, address1: string, address2: string, country: string, state: string, city: string, zip: string, mobile: string) {
        await this.firstNameInput.fill(fn);
        await this.lastNameInput.fill(ln);
        await this.companyInput.fill(company);
        await this.firstNameInput.fill(fn);
        await this.firstNameInput.fill(fn);
        await this.companyInput.fill(company);
        await this.address1Input.fill(address1);
        await this.address2Input.fill(address2);
        await this.countrySelect.selectOption(country);
        await this.stateInput.fill(state);
        await this.cityInput.fill(city);
        await this.zipInput.fill(zip);
        await this.mobileInput.fill(mobile);
    }

    async clcikCreateBtn() {
        await this.createAccountBtn.click();
    }

    async clickContinueBtn() {
        await this.continueBtn.click();
    }
}