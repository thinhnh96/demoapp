import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  private page: Page;
  private cartIcon: Locator;
  private cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  private addToCartButton(item: string): Locator {
    return this.page.locator(`[data-test="add-to-cart-${item}"]`);
  }

  private removeButton(item: string): Locator {
    return this.page.locator(`[data-test="remove-${item}"]`);
  }

  async addItem(item: string) {
    await this.addToCartButton(item).click();
    await expect(this.removeButton(item)).toBeVisible();
  }

  async removeItem(item: string) {
    await this.removeButton(item).click();
    await expect(this.addToCartButton(item)).toBeVisible();
  }

  async expectCartCount(count: number) {
    if (count === 0) {
      await expect(this.cartBadge).toBeHidden();
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}

