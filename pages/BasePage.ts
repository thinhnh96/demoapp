
import { expect, Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * 🧭 Redirect to url
   */
  async goToPage(url: string) {
    console.log(`🧭 Going to ${url}`);
    const start = Date.now();
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    const duration = Date.now() - start;
    console.log(`✅ Page loaded in ${duration}ms`);
  }

  /**
   * ✅ Verify title page
   */
  async verifyPageTitle(expectedTitle: string) {
    console.log(`🔍 Verifying page title equals "${expectedTitle}"`);
    const actualTitle = await this.page.title();
    console.log(`Actual page title: "${actualTitle}"`);

    await expect(this.page).toHaveTitle(expectedTitle);
  }
}