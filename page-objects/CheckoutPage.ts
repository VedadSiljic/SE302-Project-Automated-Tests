import {expect, Locator, Page} from "@playwright/test";

export default class CheckoutPage {
    private page: Page;
    readonly proceedToCheckoutBtn: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;
    readonly address: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly country: Locator;
    readonly postcode: Locator;
    readonly paymentMethod: Locator;
    readonly confirmBtn: Locator;
    readonly creditCardNumber: Locator;
    readonly expirationDate: Locator;
    readonly cvv: Locator;
    readonly cardHolderName: Locator;
    readonly orderSuccessToast: Locator;
    readonly finishBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.proceedToCheckoutBtn = page.getByRole("button", {name: "Proceed to checkout"});
        this.email = page.locator("#email");
        this.password = page.locator("#password");
        this.loginBtn = page.getByRole("button", {name: "Login"});
        this.address = page.locator("#address");
        this.city = page.locator("#city");
        this.state = page.locator("#state");
        this.country = page.locator("#country");
        this.postcode = page.locator("#postcode");
        this.paymentMethod = page.locator("#payment-method");
        this.confirmBtn = page.getByRole("button", {name: "Confirm"});
        this.creditCardNumber = page.locator("#credit_card_number");
        this.expirationDate = page.locator("#expiration_date");
        this.cvv = page.locator("#cvv");
        this.cardHolderName = page.locator("#card_holder_name");
        this.orderSuccessToast = page.locator("div[class^='alert']");
        this.finishBtn = page.locator("button[data-test='finish']");
    }

    async login(email: string, password: string) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

    async fillBillingAddress(address: string, city: string, state: string, country: string,
                             postcode: string) {

        // wait for default values to load in the input fields
        while (await this.city.inputValue() !== "Vienna") {
            await this.page.waitForTimeout(1000);
        }

        await this.address.fill(address);
        await this.city.fill(city);
        await this.state.fill(state);
        await this.country.fill(country);
        await this.postcode.fill(postcode);

        await this.proceedToCheckoutBtn.click();
    }

    async fillPayment(creditCardNumber: string, expirationDate: string, cvv: string,
                      cardHolderName: string) {
        await this.paymentMethod.selectOption({label: "Credit Card"});

        await this.creditCardNumber.fill(creditCardNumber);
        await this.expirationDate.fill(expirationDate);
        await this.cvv.fill(cvv);
        await this.cardHolderName.fill(cardHolderName);

        await this.finishBtn.click();
    }

    async checkoutWithoutPreLogin(email: string, password: string, address: string, city: string, state: string,
                               country: string, postcode: string, creditCardNumber: string, expirationDate: string,
                               cvv: string, cardHolderName: string) {
        await this.proceedToCheckoutBtn.click();
        await this.login(email, password);
        await this.proceedToCheckoutBtn.click();
        await this.fillBillingAddress(address, city, state, country, postcode);
        await this.fillPayment(creditCardNumber, expirationDate, cvv, cardHolderName);
    }

    async checkoutWithPreLogin(address: string, city: string, state: string, country: string, postcode: string,
                               creditCardNumber: string, expirationDate: string, cvv: string, cardHolderName: string) {
        await this.proceedToCheckoutBtn.click();
        await this.proceedToCheckoutBtn.click();
        await this.fillBillingAddress(address, city, state, country, postcode);
        await this.fillPayment(creditCardNumber, expirationDate, cvv, cardHolderName);
    }

    async assertCheckoutSuccess() {
        await expect(this.orderSuccessToast).toBeVisible();
    }
}