import {test} from "@playwright/test";
import LoginPage from "../../page-objects/LoginPage";
import HomePage from "../../page-objects/HomePage";
import ProductPage from "../../page-objects/ProductPage";
import RegisterPage from "../../page-objects/RegisterPage";

const registerUrl = "https://practicesoftwaretesting.com/auth/register";
const homeUrl = "https://practicesoftwaretesting.com/";
const accountUrl = "https://practicesoftwaretesting.com/account";
const loginUrl = "https://practicesoftwaretesting.com/auth/login";

let productPage: ProductPage;


test.describe("normal add to favorites", () => {

    test.beforeEach(async ({page}) => {
        const randomEmail = `${Date.now()}@mail.com`; // get a random email because we can't use the same one for every test
        await page.goto(registerUrl);
        const registerPage = new RegisterPage(page);

        await registerPage.register("John", "Doe", "1994-04-04", "unknown street", "74000", "Unknown city", "Unknown state",
            "Bosnia and Herzegovina", "063111222", randomEmail, "JohnDoe123$somethingRandom");
        await page.waitForURL(loginUrl);
        const loginPage = new LoginPage(page);
        await loginPage.login(randomEmail, "JohnDoe123$somethingRandom");
        await page.waitForURL(accountUrl);
        await page.goto(homeUrl);
        const homePage = new HomePage(page);
        productPage = new ProductPage(page);

        await homePage.clickDisplayedProduct(6);
    });

    test("add to favorites", async () => {
        await productPage.addToFavorites();
        await productPage.assertAddToFavoritesSuccess();
    });
});

test.describe("normal add to favorites negative", () => {

    test.beforeEach(async ({page}) => {
        await page.goto(homeUrl);
        const homePage = new HomePage(page);
        productPage = new ProductPage(page);

        await homePage.clickDisplayedProduct(6);
    });

    test("add to favorites", async () => {
        await productPage.addToFavorites();
        await productPage.assertAddToFavoritesFailNotAuthorized();
    });
});

test.describe("normal add to favorites negative, already added", () => {

    test.beforeEach(async ({page}) => {
        const randomEmail = `${Date.now()}@mail.com`; // get a random email because we can't use the same one for every test
        await page.goto(registerUrl);
        const registerPage = new RegisterPage(page);

        await registerPage.register("John", "Doe", "1994-04-04", "unknown street", "74000", "Unknown city", "Unknown state",
            "Bosnia and Herzegovina", "063111222", randomEmail, "JohnDoe123$somethingRandom");
        await page.waitForURL(loginUrl);
        const loginPage = new LoginPage(page);
        await loginPage.login(randomEmail, "JohnDoe123$somethingRandom");
        await page.waitForURL(accountUrl);
        await page.goto(homeUrl);
        const homePage = new HomePage(page);
        productPage = new ProductPage(page);

        await homePage.clickDisplayedProduct(6);
        await productPage.addToFavorites();
        await page.waitForLoadState("networkidle");
        await page.reload();
    });

    test("add to favorites", async () => {
        await productPage.addToFavorites();
        await productPage.assertAddToFavoritesFailAlreadyAdded();
    });
});