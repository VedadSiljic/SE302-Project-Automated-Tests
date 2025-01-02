import ProductPage from "../../page-objects/ProductPage";
import {test} from "@playwright/test";
import HomePage from "../../page-objects/HomePage";
import CheckoutPage from "../../page-objects/CheckoutPage";
import LoginPage from "../../page-objects/LoginPage";

const loginPageUrl = "https://practicesoftwaretesting.com/auth/login";
const homePageUrl = "https://practicesoftwaretesting.com/";
const checkoutPageUrl = "https://practicesoftwaretesting.com/checkout";
const accountPageUrl = "https://practicesoftwaretesting.com/account";

let checkoutPage: CheckoutPage;

test.beforeEach(async ({page}) =>  {
    await page.goto(loginPageUrl);
    const loginPage = new LoginPage(page);
    await loginPage.login("customer@practicesoftwaretesting.com", "welcome01");
    await page.waitForURL(accountPageUrl);
    await page.goto(homePageUrl);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.clickDisplayedProduct(6);
    await productPage.addToCart();

    await page.goto(checkoutPageUrl);
    checkoutPage = new CheckoutPage(page);

});

test("checkout with pre login success", async () => {
    await checkoutPage.checkoutWithPreLogin("Unknown Address 24", "Unknown city", "Amazing state", "Bosnia", "74000",
        "1111-2222-3333-4444", "12/2026", "666", "John Doe");

    await checkoutPage.assertCheckoutSuccess();
});