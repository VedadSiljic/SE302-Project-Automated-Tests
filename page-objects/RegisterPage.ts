import {expect, Locator, Page} from "@playwright/test";

export default class RegisterPage {
    private page: Page
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly dob: Locator;
    readonly address: Locator;
    readonly postcode: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly country: Locator;
    readonly phone: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly registerBtn: Locator;
    readonly alertContainer: Locator;
    readonly alertAlreadyExistsContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator("#first_name");
        this.lastName = page.locator("#last_name");
        this.dob = page.locator("#dob");
        this.address = page.locator("#address");
        this.postcode = page.locator("#postcode");
        this.city = page.locator("#city");
        this.state = page.locator("#state");
        this.country = page.locator("#country");
        this.phone = page.locator("#phone");
        this.email = page.locator("#email");
        this.password = page.locator("#password");
        this.registerBtn = page.getByRole("button", {name: "Register"});
        this.alertContainer = page.locator(".alert");
        this.alertAlreadyExistsContainer = page.locator("div[data-test='register-error']");
    }

    async register(firstName: string, lastName: string, dob: string, address: string, postcode: string,
                            city: string, state: string, country: string, phone: string, email: string,
                            password: string) {

        // Fill the form input fields
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.dob.fill(dob);
        await this.address.fill(address);
        await this.postcode.fill(postcode);
        await this.city.fill(city);
        await this.state.fill(state);
        await this.country.selectOption({label: country});
        await this.phone.fill(phone);
        await this.email.fill(email);
        await this.password.fill(password);

        // Click the register btn
        await this.registerBtn.click();
    }

    async assertSuccess(loginUrl: string) {
        // wait for the login page to load if loading
        await this.page.waitForLoadState("networkidle");

        expect(this.page.url()).toBe(loginUrl);
    }

    async assertCustomerWithSameEmailExists() {
        await expect(this.alertAlreadyExistsContainer).toBeVisible();
    }

    async assertRequiredInputFieldEmpty() {
        const alertCount = await this.alertContainer.count();
        expect(alertCount).toBeGreaterThan(0);
    }
}