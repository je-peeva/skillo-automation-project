export class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.url = "/users/register";

    //Locators
    this.heading = this.page.locator("h4");
    this.usernameInput = this.page.locator('[formcontrolname="username"]');
    this.emailInput = this.page.locator('[formcontrolname="email"]');
    this.birthDateInput = this.page.locator('[formcontrolname="birthDate"]');
    this.passwordInput = this.page.locator('[formcontrolname="password"]');
    this.confirmPasswordInput = this.page.locator(
      '[formcontrolname="confirmPassword"]'
    );
    this.publicInfoInput = this.page.locator('[formcontrolname="publicInfo"]');
    this.signUpButton = this.page.locator("#sign-in-button");
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async clickSignUpButton() {
    await this.signUpButton.click();
  }

  //Populate only required fields within registration form
  async setRequiredFields(requiredValues) {
    const { username, email, birthDateIso, password, confirmPassword } =
      requiredValues;

    await this.setUsername(username);
    await this.setEmail(email);
    await this.setBirthDate(birthDateIso);
    await this.setPassword(password);
    await this.setConfirmPassword(confirmPassword);
  }

  //Populate required and optional fields within registration form
  async setAllFields(allValues) {
    const {
      username,
      email,
      birthDateIso,
      password,
      confirmPassword,
      publicInfoValue,
    } = allValues;

    await this.setUsername(username);
    await this.setEmail(email);
    await this.setBirthDate(birthDateIso);
    await this.setPassword(password);
    await this.setConfirmPassword(confirmPassword);
    await this.setPublicInfo(publicInfoValue);
  }

  async setUsername(username) {
    await this.usernameInput.fill(username);
  }

  async setEmail(email) {
    await this.emailInput.fill(email);
  }

  //Populate birthDate value using parameter with ISO format "yyyy-mm-dd"
  async setBirthDate(birthDateIso) {
    await this.birthDateInput.fill(birthDateIso);
  }

  async setPassword(password) {
    await this.passwordInput.fill(password);
  }

  async setConfirmPassword(confirmPassword) {
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async setPublicInfo(publicInfo) {
    await this.publicInfoInput.fill(publicInfo);
  }

  //Get validation message for each input on registration form
  getValidationMessage(formControlName) {
    return this.page.locator(
      `input[formcontrolname="${formControlName}"] + .invalid-feedback`
    );
  }
}
