import { test } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';
import { users } from '../test-data/users';
import { env } from '../../configs/env';

test.describe('Login – Edge Cases', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('01. Login success with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      env.user.username,
      env.user.password
    );

    await loginPage.expectLoginSuccess();
  });

  test('02. Login fail – invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      users.invalid.username,
      users.invalid.password
    );

    await loginPage.expectLoginError(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('03. Login fail – locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      users.locked.username,
      users.locked.password
    );

    await loginPage.expectLoginError(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });

  test('04. Login fail – empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      '',                      
      users.valid.password
    );

    await loginPage.expectLoginError(
      'Epic sadface: Username is required'
    );
  });

  test('05. Login fail – empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      users.valid.username,
      ''                       
    );

    await loginPage.expectLoginError(
      'Epic sadface: Password is required'
    );
  });

});


