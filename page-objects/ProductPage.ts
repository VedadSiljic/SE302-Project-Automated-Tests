import {expect, Locator, Page} from "@playwright/test";

export default class ProductPage {
    private page: Page;
    readonly addToCartBtn: Locator;
    readonly itemAmount: Locator;
    readonly increaseItemAmount: Locator;
    readonly decreaseItemAmount: Locator;
    readonly itemAddedSuccessToast: Locator;
    readonly addToFavoritesBtn: Locator;
    readonly toastAddToFavorites: Locator;
    readonly toastAddToFavoritesAlreadyExists: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartBtn = page.getByRole("button", {name: "Add to cart"});
        this.itemAmount = page.locator("#quantity-input");
        this.increaseItemAmount = page.locator("#btn-increase-quantity");
        this.decreaseItemAmount = page.locator("#btn-decrease-quantity");
        this.itemAddedSuccessToast = page.locator("div[class$='toast-success']");
        this.addToFavoritesBtn = page.locator("button[data-test='add-to-favorites']");
        this.toastAddToFavorites = page.locator("div[aria-label*='to']");
        this.toastAddToFavoritesAlreadyExists = page.locator("div[aria-label*='in']");
    }

    async addToCart(amount: number = 1) {
        for (let i = 0; i < amount - 1; i++) {
            await this.increaseItemAmount.click();
        }

        await this.addToCartBtn.click();
        await this.itemAddedSuccessToast.waitFor({ state: 'visible', timeout: 10000 }); // Wait for the toast to appear
    }

    async assertItemAddedToCart() {
        await expect(this.itemAddedSuccessToast).toBeVisible();
    }

    async addToFavorites() {
        await this.addToFavoritesBtn.click();
    }

    async assertAddToFavoritesSuccess() {
        await this.toastAddToFavorites.isVisible();
        await expect(this.toastAddToFavorites).toContainText("Product added to your favorites list.");
    }

    async assertAddToFavoritesFailNotAuthorized() {
        await this.toastAddToFavorites.isVisible();
        await expect(this.toastAddToFavorites).toContainText("Unauthorized, can not add product to your favorite list.");
    }

    async assertAddToFavoritesFailAlreadyAdded() {
        await this.toastAddToFavoritesAlreadyExists.isVisible();
    }
}