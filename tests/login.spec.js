import { test, expect } from "./fixtures/combined-fixtures.js";

test.beforeEach("Navigate to Login page", async ({ page, loginPage }) => {
  await loginPage.navigate();
  await expect(page).toHaveURL(loginPage.url);
  await expect(loginPage.heading).toHaveText("Sign in");
  await expect(loginPage.signInButton).toBeDisabled();
});

test("Login with valid credentails", async ({
  page,
  loginPage,
  homePage,
  profilePage,
  header,
  headerUI,
  toast,
  toastMessages,
  testUser,
}) => {
  const validLogins = [
    { caseName: "Email", credentials: testUser.validLoginWithEmail },
    { caseName: "Username", credentials: testUser.validLoginWithUsername },
  ];

  for (const loginCase of validLogins) {
    await test.step(`Login with valid ${loginCase.caseName}`, async () => {
      await loginPage.login(loginCase.credentials);

      await toast.waitForVisible(toastMessages.successfulLogin);
      await expect(toast.toastMessage.first()).toHaveText(
        toastMessages.successfulLogin
      );
      await expect(page).toHaveURL(homePage.url);
      await headerUI.loggedInUI();

      await header.goToProfile();
      await expect(profilePage.username).toHaveText(testUser.usernameValue);

      await header.signOut();
    });
  }
});

test("Login with invalid credentials", async ({
  page,
  loginPage,
  headerUI,
  toast,
  toastMessages,
  testUser,
}) => {
  const invalidLogins = [
    { caseName: "Email", credentials: testUser.invalidLoginWithEmail },
    { caseName: "Username", credentials: testUser.invalidLoginWithUsername },
    { caseName: "Password", credentials: testUser.invalidLoginWithPassword },
  ];

  for (const loginCase of invalidLogins) {
    await test.step(`Login attempt using invalid ${loginCase.caseName}`, async () => {
      await loginPage.login(loginCase.credentials);

      await toast.waitForVisible(toastMessages.failedLogin);
      await expect(toast.toastMessage.first()).toHaveText(
        toastMessages.failedLogin
      );
      await expect(page).toHaveURL(loginPage.url);
      await headerUI.loggedOutUI();
    });
  }
});

test("Login with missing credentials", async ({
  page,
  loginPage,
  headerUI,
  testUser,
}) => {
  const emptyLogins = [
    { caseName: "Email", credentials: testUser.missingEmail },
    { caseName: "Password", credentials: testUser.missingPassword },
  ];

  for (const loginCase of emptyLogins) {
    await test.step(`Login attempt using empty ${loginCase.caseName}`, async () => {
      if (loginCase.credentials.identifier !== undefined) {
        await loginPage.setEmailOrUsername(loginCase.credentials.identifier);
      }
      if (loginCase.credentials.password !== undefined) {
        await loginPage.setPassword(loginCase.credentials.password);
      }

      await expect(loginPage.signInButton).toBeDisabled();
      await expect(page).toHaveURL(loginPage.url);
      await headerUI.loggedOutUI();
    });
  }
});
