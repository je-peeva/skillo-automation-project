export class Toast {
  constructor(page) {
    this.page = page;
    this.toastMessage = this.page.locator("#toast-container .toast-message");
  }

  async getText() {
    return this.toastMessage.innerText();
  }

  async waitForVisible(message, timeout = 8000) {
    const locator = this.toastMessage.filter({ hasText: message });
    await locator.first().waitFor({ state: "visible", timeout });
  }
}
