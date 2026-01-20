import { test as setup } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { env } from '../../configs/env';

setup('Authenticate – Firefox', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/');

  await loginPage.login(
    env.user.username,
    env.user.password
  );

  await loginPage.expectLoginSuccess();

  await page.context().storageState({
    path: 'storage/auth.firefox.json',
  });
});
