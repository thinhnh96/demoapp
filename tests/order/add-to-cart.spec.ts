import { test } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { ITEMS } from '../test-data/items';

test.describe('Cart functionality', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test('01. Add 1 item to cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addItem(ITEMS.BACKPACK.id);
    await inventory.expectCartCount(1);

    await inventory.goToCart();
    await cart.expectItemVisible(ITEMS.BACKPACK.name);
  });

  test('02. Add multiple items to cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addItem(ITEMS.BACKPACK.id);
    await inventory.addItem(ITEMS.BIKE.id);
    await inventory.expectCartCount(2);

    await inventory.goToCart();
    await cart.expectItemVisible(ITEMS.BACKPACK.name);
    await cart.expectItemVisible(ITEMS.BIKE.name);
  });

  test('03. Remove item from cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addItem(ITEMS.BACKPACK.id);
    await inventory.expectCartCount(1);

    await inventory.removeItem(ITEMS.BACKPACK.id);
    await inventory.expectCartCount(0);

    await inventory.goToCart();
    await cart.expectItemNotVisible(ITEMS.BACKPACK.name);
  });

  test('04. Cart state persists after reload', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addItem(ITEMS.BIKE.id);
    await inventory.expectCartCount(1);

    await page.reload();
    await inventory.expectCartCount(1);

    await inventory.goToCart();
    await cart.expectItemVisible(ITEMS.BIKE.name);
  });

});
