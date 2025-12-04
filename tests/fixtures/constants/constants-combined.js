import { TOAST_MESSAGES } from "./toast-messages.js";
import { PAGE_TITLES } from "./page-titles.js";
import { VALIDATION_MESSAGES } from "./validation-messages.js";

export const constantMessages = {
  toastMessages: async ({}, use) => {
    await use(TOAST_MESSAGES);
  },

  pageTitles: async ({}, use) => {
    await use(PAGE_TITLES);
  },

  validations: async ({}, use) => {
    await use(VALIDATION_MESSAGES);
  },
};
