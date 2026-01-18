import { Page, Locator } from '@playwright/test';

export class LocatorFactory {
  constructor(private page: Page) {}

  build(config: any): Locator {
    switch (config.type) {
      case 'role':
        return this.page.getByRole(config.value, config.options);
      case 'text':
        return this.page.getByText(config.value, config.options);
      case 'label':
        return this.page.getByLabel(config.value, config.options);
      case 'placeholder':
        return this.page.getByPlaceholder(config.value);
      case 'testId':
        return this.page.getByTestId(config.value);
      case 'locator':
      default:
        return this.page.locator(config.value);
    }
  }
}
