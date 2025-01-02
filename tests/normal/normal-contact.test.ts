import ContactPage from "../../page-objects/ContactPage";
import {test} from "@playwright/test";

const contactPageUrl = "https://practicesoftwaretesting.com/contact";

let contactPage: ContactPage;

test.beforeEach(async ({page}) => {
    await page.goto(contactPageUrl);
    contactPage = new ContactPage(page);
});

test("normal contact", async () => {
    const message = "Urgent: Resolve the broken links, optimize images, and speed up.";
    await contactPage.send("John", "Doe", "john@doe.com", "Webmaster", message);

    await contactPage.assertSendSuccess();
});