import {test} from "@playwright/test";
import LoginPage from "../../page-objects/LoginPage";

const loginUrl = "https://practicesoftwaretesting.com/auth/login";

let loginPage: LoginPage;

test.describe("normal login tests", () => {

    test.beforeEach(async ({page}) => {
        await page.goto(loginUrl);
        loginPage = new LoginPage(page);
    });

    test("invalid email or password", async () => {
        await loginPage.login("customer@practicesoftwaretesting.com", "someinvalidpassword");

        await loginPage.assertInvalidEmailOrPassword()
    });

    test("empty email input field", async () => {
        await loginPage.login("", "welcome01");

        await loginPage.assertEmptyEmailField();
    });

    test("empty password input field", async () => {
        await loginPage.login("customer@practicesoftwaretesting.com", "");

        await loginPage.assertEmptyPasswordField();
    });

});