export class Header {
  constructor(page) {
    this.page = page;

    //Locators
    this.signOutButton = this.page.locator('[class*="sign-out"]');
    this.loginLink = this.page.locator("#nav-link-login");
    this.homeLink = this.page.locator("#nav-link-home");
    this.profileLink = this.page.locator("#nav-link-profile");
    this.newPostLink = this.page.locator("#nav-link-new-post");
  }

  async signOut() {
    await this.signOutButton.click();
  }

  async goToLogin() {
    await this.loginLink.click();
  }

  async goToHome() {
    await this.homeLink.click();
  }

  async goToProfile() {
    await this.profileLink.click();
  }

  async goToNewPost() {
    await this.newPostLink.click();
  }
}
