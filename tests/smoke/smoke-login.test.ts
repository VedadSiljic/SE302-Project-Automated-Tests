import {test} from "@playwright/test";
import LoginPage from "../../page-objects/LoginPage";

const loginUrl = "https://practicesoftwaretesting.com/auth/login";
const accountUrl = "https://practicesoftwaretesting.com/account";

let loginPage: LoginPage;

test.beforeEach(async ({page}) => {
    await page.goto(loginUrl);
    loginPage = new LoginPage(page);
});

test("login smoke test", async () => {
    await loginPage.login("customer@practicesoftwaretesting.com", "welcome01");

    await loginPage.assertSuccess(accountUrl);
});