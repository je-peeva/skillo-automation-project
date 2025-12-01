import { test, expect } from "./fixtures/combined-fixtures.js";

test.beforeEach(
  "Successful login",
  async ({
    page,
    login,
    homePage,
    headerUI,
    toast,
    toastMessages,
    testUser,
  }) => {
    await login(testUser.validLoginWithEmail);

    await toast.waitForVisible(toastMessages.successfulLogin);
    await expect(toast.toastMessage.first()).toHaveText(
      toastMessages.successfulLogin
    );
    await expect(page).toHaveURL(homePage.url);
    await headerUI.loggedInUI();
  }
);

test("Successful logout", async ({
  page,
  loginPage,
  header,
  headerUI,
  toast,
  toastMessages,
}) => {
  await header.signOut();

  await toast.waitForVisible(toastMessages.successfulLogout);
  await expect(toast.toastMessage.first()).toHaveText(
    toastMessages.successfulLogout
  );
  await expect(page).toHaveURL(loginPage.url);
  await headerUI.loggedOutUI();
});

test("Access restricted pages after logout", async ({
  page,
  loginPage,
  profilePage,
  newPostPage,
  header,
  headerUI,
  toast,
  toastMessages,
}) => {
  await header.goToProfile();
  await expect(page).toHaveURL(profilePage.url);

  await header.goToNewPost();
  await expect(page).toHaveURL(newPostPage.url);

  await header.signOut();

  await toast.waitForVisible(toastMessages.successfulLogout);
  await expect(toast.toastMessage.first()).toHaveText(
    toastMessages.successfulLogout
  );
  await expect(page).toHaveURL(loginPage.url);

  await headerUI.loggedOutUI();

  const inaccessiblePages = [profilePage, newPostPage];
  for (const restricted of inaccessiblePages) {
    await restricted.navigate();

    await toast.waitForVisible(toastMessages.pageRestriction);
    await expect(toast.toastMessage.first()).toHaveText(
      toastMessages.pageRestriction
    );
    await expect(page).toHaveURL(loginPage.url);
  }
});
