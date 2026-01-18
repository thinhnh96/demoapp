import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

  constructor(page: Page) {
    super(page); 
  }

  private get usernameInput() {
    return this.page.getByPlaceholder(/username/i);
  }

  private get passwordInput() {
    return this.page.getByPlaceholder(/password/i);
  }

  private get loginButton() {
    return this.page.getByRole('button', { name: /login/i });
  }

  private get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginSuccess() {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await this.verifyPageTitle('Swag Labs');
  }

  async expectLoginError(message: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }
}
