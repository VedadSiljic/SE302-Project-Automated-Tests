import ProductPage from "../../page-objects/ProductPage";
import {test} from "@playwright/test";
import HomePage from "../../page-objects/HomePage";
import CheckoutPage from "../../page-objects/CheckoutPage";

const homePageUrl = "https://practicesoftwaretesting.com/";
const checkoutPageUrl = "https://practicesoftwaretesting.com/checkout";

let checkoutPage: CheckoutPage;

test.beforeEach(async ({page}) =>  {
    await page.goto(homePageUrl);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.clickDisplayedProduct(6);
    await productPage.addToCart();

    await page.goto(checkoutPageUrl);
    checkoutPage = new CheckoutPage(page);

});

test("checkout smoke test", async () => {
    await checkoutPage.checkoutWithoutPreLogin("customer@practicesoftwaretesting.com", "welcome01",
        "Unknown Address 24", "Unknown city", "Amazing state", "Bosnia", "74000", "1111-2222-3333-4444", "12/2026",
        "666", "John Doe");

    await checkoutPage.assertCheckoutSuccess();
});