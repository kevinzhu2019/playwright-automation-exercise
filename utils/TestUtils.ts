import { Locator, Page } from "@playwright/test";
import { TIMEOUT } from "node:dns";

export class TestUtils {

    static generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }

    static async closeAdPopup(page: Page): Promise<void> {

        // There could be multiple iframe DOMs exist
        const adFrames = page.locator("iframe[id^='aswift_']");

        const frameCount = await adFrames.count();
        for (let i = 0; i < frameCount; i++) {
            const closeBtn = adFrames
                .nth(i)
                .contentFrame()
                .locator("//div[@id='ad_position_box']//div[@class='close-button']");
            try {
                if (await closeBtn.isVisible({ timeout: 3000 })) {
                    await closeBtn.click();
                    console.log('Add popup is closed.');
                    return;
                } else
                    console.log('Ad popup is not visible.')
            } catch {
                console.log('Page does not have ad popup.')
            }
        }
    }
}