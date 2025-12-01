import { test as base, expect } from "@playwright/test";
import { RegistrationPage } from "../../pages/RegistrationPage.js";
import { LoginPage } from "../../pages/LoginPage.js";
import { Header } from "../../pages/Header.js";
import { ProfilePage } from "../../pages/ProfilePage.js";
import { PostModal } from "../../pages/PostModal.js";
import { NewPostPage } from "../../pages/NewPostPage.js";
import { HomePage } from "../../pages/HomePage.js";
import { Toast } from "../../pages/Toast.js";

import * as generators from "./test-data/data-generators.js";
import * as staticData from "./test-data/static-data.js";
import { TOAST_MESSAGES } from "./test-data/toast-messages.js";
import { PAGE_TITLES } from "./test-data/page-titles.js";
import { VALIDATION_MESSAGES } from "./test-data/validation-messages.js";

export const test = base.extend({
  //Page objects
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await use(registrationPage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  header: async ({ page }, use) => {
    const header = new Header(page);
    await use(header);
  },

  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page, staticData.userId);
    await use(profilePage);
  },

  postModal: async ({ page }, use) => {
    const postModal = new PostModal(page);
    await use(postModal);
  },

  newPostPage: async ({ page }, use) => {
    const newPostPage = new NewPostPage(page);
    await use(newPostPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  toast: async ({ page }, use) => {
    const toastMessage = new Toast(page);
    await use(toastMessage);
  },

  //Test data
  testUser: async ({}, use) => {
    const user = {
      generateRequiredFields() {
        return {
          username: generators.generateUsername(),
          email: generators.generateEmail(),
          birthDateIso: generators.generateAdultDate(),
          password: staticData.passwordValue,
          confirmPassword: staticData.passwordValue,
        };
      },

      generateAllFields() {
        return {
          username: generators.generateUsername(),
          email: generators.generateEmail(),
          birthDateIso: generators.generateAdultDate(),
          password: staticData.passwordValue,
          confirmPassword: staticData.passwordValue,
          publicInfoValue: "je public info",
        };
      },

      generateCustomDate(years) {
        return generators.generateCustomDate(years);
      },

      ...staticData,
    };
    await use(user);
  },

  toastMessages: async ({}, use) => {
    await use(TOAST_MESSAGES);
  },

  pageTitles: async ({}, use) => {
    await use(PAGE_TITLES);
  },

  validations: async ({}, use) => {
    await use(VALIDATION_MESSAGES);
  },

  headerUI: async ({ header }, use) => {
    const headerHelpers = {
      async loggedInUI() {
        await expect(header.homeLink).toBeVisible();
        await expect(header.profileLink).toBeVisible();
        await expect(header.newPostLink).toBeVisible();
        await expect(header.signOutButton).toBeVisible();
        await expect(header.loginLink).not.toBeVisible();
      },
      async loggedOutUI() {
        await expect(header.homeLink).toBeVisible();
        await expect(header.loginLink).toBeVisible();
        await expect(header.profileLink).not.toBeVisible();
        await expect(header.newPostLink).not.toBeVisible();
        await expect(header.signOutButton).not.toBeVisible();
      },
    };

    await use(headerHelpers);
  },

  login: async ({ loginPage }, use) => {
    const validLogin = async (credentials) => {
      await loginPage.navigate();
      await loginPage.login(credentials);
    };

    await use(validLogin);
  },

  state: async ({}, use) => {
    await use({
      initialPrivatePostsCount: 0,
      initialPublicPostsCount: 0,
      initialAllPostsCount: 0,
      currentPrivatePostsCount: 0,
      currentPublicPostsCount: 0,
      currentAllPostsCount: 0,
      initialActiveToggle: "",
      currentActiveToggle: "",
      imageName: "",
      caption: "",
    });
  },
});

export { expect } from "@playwright/test";
