import {expect, Locator, Page} from "@playwright/test";

export default class HomePage {
    private page: Page;
    readonly searchField: Locator;
    readonly searchBtn: Locator;
    readonly productsDisplayed: Locator;
    readonly noProductFoundLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchField = page.locator("#search-query");
        this.searchBtn = page.getByRole("button", {name: "Search"});
        this.productsDisplayed = page.locator("a.card");
        this.noProductFoundLabel = page.locator("div[data-test='no-results']");
    }

    async search(item: string) {
        await this.page.waitForSelector("a.card");

        await this.searchField.fill(item);
        await this.searchBtn.click();
    }

    async assertValidSearchSuccess() {
        await this.page.waitForSelector("a.card");
        const count = await this.productsDisplayed.count();
        expect(count).toBeGreaterThan(0);
    }

    async assertProductNotFound() {
        await this.page.waitForSelector("div[data-test='no-results']");
        await expect(this.noProductFoundLabel).toBeVisible();
    }

    async clickDisplayedProduct(number: number) {
        await this.productsDisplayed.nth(number).click();
    }
}