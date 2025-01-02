import HomePage from "../../page-objects/HomePage";
import {test} from "@playwright/test";

const homePageUrl = "https://practicesoftwaretesting.com/";

let homePage: HomePage;

test.beforeEach(async ({page}) => {
    await page.goto(homePageUrl);
    homePage = new HomePage(page);
});

test("search for something that doesn't exist", async () => {
    await homePage.search("something super x3000");

    await homePage.assertProductNotFound();
});
