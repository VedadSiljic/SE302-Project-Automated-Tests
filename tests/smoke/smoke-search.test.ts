import HomePage from "../../page-objects/HomePage";
import {test} from "@playwright/test";

const homePageUrl = "https://practicesoftwaretesting.com/";

let homePage: HomePage;

test.beforeEach(async ({page}) => {
    await page.goto(homePageUrl);
    homePage = new HomePage(page);
});

test("search smoke test", async () => {
    await homePage.search("pliers");

    await homePage.assertValidSearchSuccess();
});
