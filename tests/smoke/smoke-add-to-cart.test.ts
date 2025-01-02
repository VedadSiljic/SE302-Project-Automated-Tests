import HomePage from "../../page-objects/HomePage";
import {test} from "@playwright/test";
import ProductPage from "../../page-objects/ProductPage";

const homePageUrl = "https://practicesoftwaretesting.com/";

let homePage: HomePage;
let productPage: ProductPage;

test.beforeEach(async ({page}) => {
    await page.goto(homePageUrl);
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
});

test("add to cart smoke test", async () => {
    await homePage.clickDisplayedProduct(6);
    await productPage.addToCart();
    await productPage.assertItemAddedToCart();
});
