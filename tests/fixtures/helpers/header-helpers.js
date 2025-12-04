import { expect } from "@playwright/test";

export const headerHelper = {
  headerUI: async ({ header }, use) => {
    const helpers = {
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

    await use(helpers);
  },
};
