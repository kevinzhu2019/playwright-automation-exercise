import { type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    private page: Page;

    public readonly deliveryAddrSubheading: Locator;
    public readonly deliveryAddrLN: Locator;
    public readonly deliveryAddr1: Locator;
    public readonly deliveryAddr2: Locator;
    public readonly deliveryAddr3: Locator;
    public readonly deliveryAddrCityPostalCode: Locator;
    public readonly deliveryAddrCountry: Locator;
    public readonly deliveryAddrPhone: Locator;
    
    public readonly billingAddrSubheading: Locator;
    public readonly billingAddrLN: Locator;
    public readonly billingAddr1: Locator;
    public readonly billingAddr2: Locator;
    public readonly billingAddr3: Locator;
    public readonly billingAddrCityPostalCode: Locator;
    public readonly billingAddrCountry: Locator;
    public readonly billingAddrPhone: Locator;

    public readonly orderComment: Locator;
    public readonly placeOrderBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.deliveryAddrSubheading = page.locator("//ul[@id='address_delivery']/li/h3[@class='page-subheading']");
        this.deliveryAddrLN = page.locator(
            "//ul[@id='address_delivery']/li[@class='address_firstname address_lastname']"
        );
        this.deliveryAddr1 = page.locator(
            "(//ul[@id='address_delivery']/li[@class='address_address1 address_address2'])[1]"
        );
        this.deliveryAddr2 = page.locator(
            "(//ul[@id='address_delivery']/li[@class='address_address1 address_address2'])[2]"
        );
        this.deliveryAddr3 = page.locator(
            "(//ul[@id='address_delivery']/li[@class='address_address1 address_address2'])[3]"
        );
        this.deliveryAddrCityPostalCode = page.locator(
            "//ul[@id='address_delivery']/li[contains(@class,'address_postcode')]"
        );
        this.deliveryAddrCountry = page.locator("//ul[@id='address_delivery']/li[@class='address_country_name']");
        this.deliveryAddrPhone = page.locator("//ul[@id='address_delivery']/li[@class='address_phone']");
        this.billingAddrSubheading = page.locator("//ul[@id='address_invoice']/li/h3[@class='page-subheading']");
        this.billingAddrLN = page.locator("//ul[@id='address_invoice']/li[@class='address_firstname address_lastname']");
        this.billingAddr1 = page.locator(
            "(//ul[@id='address_invoice']/li[@class='address_address1 address_address2'])[1]"
        );
        this.billingAddr2 = page.locator(
            "(//ul[@id='address_invoice']/li[@class='address_address1 address_address2'])[2]"
        );
        this.billingAddr3 = page.locator(
            "(//ul[@id='address_invoice']/li[@class='address_address1 address_address2'])[3]"
        );
        this.billingAddrCityPostalCode = page.locator(
            "//ul[@id='address_invoice']/li[@class='address_city address_state_name address_postcode']"
        );
        this.billingAddrCountry = page.locator("//ul[@id='address_invoice']/li[@class='address_country_name']");
        this.billingAddrPhone = page.locator("//ul[@id='address_invoice']/li[@class='address_phone']");
        this.orderComment = page.locator("//div[@id='ordermsg']//textarea");
        this.placeOrderBtn = page.locator("//a[contains(@class,'check_out')]");
    }

    // Enter order comment
    async fillOrderComment(comment: string) {
        await this.orderComment.fill(comment);
    }

    // Click on Place Order button
    async clickPlaceOrderBtn() {
        await this.placeOrderBtn.click();
    }
}