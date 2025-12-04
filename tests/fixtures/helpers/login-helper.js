export const loginHelper = {
  login: async ({ loginPage }, use) => {
    const validLogin = async (credentials) => {
      await loginPage.navigate();
      await loginPage.login(credentials);
    };

    await use(validLogin);
  },
};
