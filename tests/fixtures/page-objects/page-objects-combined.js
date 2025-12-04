import { RegistrationPage } from "../../../pages/RegistrationPage.js";
import { LoginPage } from "../../../pages/LoginPage.js";
import { Header } from "../../../pages/Header.js";
import { ProfilePage } from "../../../pages/ProfilePage.js";
import { PostModal } from "../../../pages/PostModal.js";
import { NewPostPage } from "../../../pages/NewPostPage.js";
import { HomePage } from "../../../pages/HomePage.js";
import { Toast } from "../../../pages/Toast.js";
import * as staticData from "../test-data/static-data.js";

export const pageObjects = {
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
};
