import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  private page: Page;

  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private postalCodeInput: Locator;

  private continueButton: Locator;
  private finishButton: Locator;

  private completeHeader: Locator;
  private errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');

    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');

    this.completeHeader = page.locator('.complete-header');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /* ===== ACTIONS ===== */

  async fillInfo(first: string, last: string, zip: string) {
    await this.firstNameInput.fill(first);
    await this.lastNameInput.fill(last);
    await this.postalCodeInput.fill(zip);
  }

  async continue() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  /* ===== ASSERTIONS ===== */

  async expectCheckoutSuccess() {
    await expect(this.completeHeader)
      .toHaveText('Thank you for your order!');
  }

  async expectError(message: string) {
    await expect(this.errorMessage)
      .toHaveText(message);
  }
}
