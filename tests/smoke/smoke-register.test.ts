import {test} from "@playwright/test";
import RegisterPage from "../../page-objects/RegisterPage";

const registerUrl = "https://practicesoftwaretesting.com/auth/register";
const loginUrl = "https://practicesoftwaretesting.com/auth/login";

let randomEmail: string;
let registerPage: RegisterPage;

test.beforeEach(async ({page})=> {
    randomEmail = `${Date.now()}@mail.com`; // get a random email because we can't use the same one for every test
    await page.goto(registerUrl);
    registerPage = new RegisterPage(page);
});

test("register smoke test", async () => {

    await registerPage.register("John", "Doe", "1994-04-04", "unknown street", "74000", "Unknown city", "Unknown state",
        "Bosnia and Herzegovina", "063111222", randomEmail, "JohnDoe123$somethingRandom");

    await registerPage.assertSuccess(loginUrl);
});