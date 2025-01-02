import {expect, Locator, Page} from "@playwright/test";

export default class ContactPage {
    private page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly subject: Locator;
    readonly message: Locator;
    readonly sendBtn: Locator;
    readonly successAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator("#first_name");
        this.lastName = page.locator("#last_name");
        this.email = page.locator("#email");
        this.subject = page.locator("#subject");
        this.message = page.locator("#message");
        this.sendBtn = page.getByRole("button", {name: "Send"});
        this.successAlert = page.locator("div[class$='mt-3']");
    }

    async send(firstName: string, lastName: string, email: string, subject: string, message: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.message.fill(message);
        await this.subject.selectOption({label: subject});

        await this.sendBtn.click();
    }

    async assertSendSuccess() {
        await this.page.waitForLoadState("networkidle");
        await expect(this.successAlert).toBeVisible();
    }
}