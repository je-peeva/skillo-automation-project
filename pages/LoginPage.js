export class LoginPage {
  constructor(page) {
    this.page = page;
    this.url = "/users/login";

    //Locators
    this.heading = this.page.locator(".h4");
    this.usernameEmailInput = this.page.locator("#defaultLoginFormUsername");
    this.passwordInput = this.page.locator("#defaultLoginFormPassword");
    this.signInButton = this.page.locator("#sign-in-button");
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async setEmailOrUsername(emailOrUsername) {
    await this.usernameEmailInput.fill(emailOrUsername);
  }

  async setPassword(password) {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.signInButton.click();
  }

  async login(credentials) {
    const { email, username, password } = credentials;
    const identifier = email || username;

    await this.setEmailOrUsername(identifier);
    await this.setPassword(password);
    await this.submit();
  }
}
