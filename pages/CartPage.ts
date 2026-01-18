import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.locator('#checkout');
  }

  cartItem(itemName: string): Locator {
    return this.page.locator('.cart_item', { hasText: itemName });
  }

  async expectItemVisible(itemName: string) {
    await expect(this.cartItem(itemName)).toBeVisible();
  }

  async expectItemNotVisible(itemName: string) {
    await expect(this.cartItem(itemName)).toHaveCount(0);
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
