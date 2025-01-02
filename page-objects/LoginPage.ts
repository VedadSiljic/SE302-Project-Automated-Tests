import {expect, Locator, Page} from "@playwright/test";

export default class LoginPage {
    private page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;
    readonly loginError: Locator;
    readonly emailError: Locator;
    readonly passwordError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.locator("#email");
        this.password = page.locator("#password");
        this.loginBtn = page.getByRole("button", {name : "Login"});
        this.loginError = page.locator("div[data-test='login-error']");
        this.emailError = page.locator("div[data-test='email-error']");
        this.passwordError = page.locator("div[data-test='password-error']");
    }

    async login(email: string, password: string) {
        await this.email.fill(email);
        await this.password.fill(password);

        await this.loginBtn.click();
    }

    async assertSuccess(accountUrl: string) {
        await this.page.waitForURL(accountUrl);
        expect(this.page.url()).toBe(accountUrl);
    }

    async assertInvalidEmailOrPassword() {
        await this.page.waitForLoadState("networkidle");
        await expect(this.loginError).toBeVisible();
    }

    async assertEmptyEmailField() {
        await this.page.waitForLoadState("networkidle");
        await expect(this.emailError).toBeVisible();
    }

    async assertEmptyPasswordField() {
        await this.page.waitForLoadState("networkidle");
        await expect(this.passwordError).toBeVisible();
    }
}