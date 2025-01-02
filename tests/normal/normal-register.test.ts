import {test} from "@playwright/test";
import RegisterPage from "../../page-objects/RegisterPage";

const registerUrl = "https://practicesoftwaretesting.com/auth/register";

let randomEmail: string;
let registerPage: RegisterPage;


test.describe("register normal tests", () => {

    test.beforeEach(async ({page})=> {
        randomEmail = `${Date.now()}@mail.com`; // get a random email because we can't use the same one for every test
        await page.goto(registerUrl);
        registerPage = new RegisterPage(page);
    });


    test("customer with this email address already exists", async () => {

        await registerPage.register("John", "Doe", "1994-04-04", "unknown street", "74000", "Unknown city", "Unknown state",
            "Bosnia and Herzegovina", "063111222", "customer@practicesoftwaretesting.com", "JohnDoe123$somethingRandom");

        await registerPage.assertCustomerWithSameEmailExists();

    });

    test("required input field empty", async () => {

        await registerPage.register("John", "", "1994-04-04", "unknown street", "74000", "Unknown city", "Unknown state",
            "Bosnia and Herzegovina", "063111222", randomEmail, "JohnDoe123$somethingRandom");

        await registerPage.assertRequiredInputFieldEmpty();

    });

});




