import * as generators from "./data-generators.js";
import * as staticData from "./static-data.js";

export const testData = {
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
};
