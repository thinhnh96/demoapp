import { test } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

import { ITEMS } from '../test-data/items';
import { USERS } from '../test-data/datacheckout'

test.describe('@regression Checkout flow @regression ', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test('01. Checkout successfully with valid information', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inventory.addItem(ITEMS.BACKPACK.id);
    await inventory.expectCartCount(1);

    await inventory.goToCart();
    await cart.expectItemVisible(ITEMS.BACKPACK.name);
    await cart.checkout();

    await checkout.fillInfo(
      USERS.VALID.firstName,
      USERS.VALID.lastName,
      USERS.VALID.postalCode
    );

    await checkout.continue();
    await checkout.finish();

    await checkout.expectCheckoutSuccess();
  });

  test('02. Checkout fails – missing first name', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inventory.addItem(ITEMS.BACKPACK.id);
    await inventory.goToCart();
    await cart.checkout();

    await checkout.fillInfo(
      USERS.MISSING_FIRST_NAME.firstName,
      USERS.MISSING_FIRST_NAME.lastName,
      USERS.MISSING_FIRST_NAME.postalCode
    );

    await checkout.continue();

    await checkout.expectError('Error: First Name is required');
  });

  test('03. Checkout fails – missing postal code', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inventory.addItem(ITEMS.BACKPACK.id);
    await inventory.goToCart();
    await cart.checkout();

    await checkout.fillInfo(
      USERS.MISSING_POSTAL_CODE.firstName,
      USERS.MISSING_POSTAL_CODE.lastName,
      USERS.MISSING_POSTAL_CODE.postalCode
    );

    await checkout.continue();

    await checkout.expectError('Error: Postal Code is required');
  });

});
