// import { test as setup, expect } from '@playwright/test';
// import { LoginPage } from '../../pages/LoginPage';
// import { users } from '../test-data/users'

// setup('Authenticate – Chrome', async ({ page }) => {
//   const loginPage = new LoginPage(page);

//   await page.goto('/');
//   await loginPage.login(users.valid1.username, users.valid1.password);
//   await loginPage.expectLoginSuccess();

//   await page.context().storageState({
//     path: 'storage/auth.chrome.json',
//   });
// });
import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { env } from '../../configs/env';

setup('Authenticate – Chrome', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // BaseURL đã cấu hình trong playwright.config.ts
  await page.goto('/');

  await loginPage.login(
    env.user.username,
    env.user.password
  );

  await loginPage.expectLoginSuccess();

  // Lưu session để reuse
  await page.context().storageState({
    path: 'storage/auth.chrome.json',
  });
});



