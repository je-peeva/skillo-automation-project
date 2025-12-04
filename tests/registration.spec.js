import { test, expect } from "./fixtures/combined-fixtures.js";

let allFields;

test.beforeEach(async ({ page, registrationPage, pageTitles }) => {
  await registrationPage.navigate();

  await expect(page).toHaveURL(registrationPage.url);
  await expect(registrationPage.heading).toHaveText(
    pageTitles.registrationPage
  );
  await expect(registrationPage.signUpButton).toBeDisabled();
});

test("Register with required fields", async ({
  page,
  registrationPage,
  homePage,
  profilePage,
  header,
  toast,
  toastMessages,
  testUser,
}) => {
  let requiredFields = testUser.generateRequiredFields();
  await registrationPage.setRequiredFields(requiredFields);

  //..bugs/registration-bugs.md > Bug-001 (Incorrect button label of "Sign up" button)
  await expect(registrationPage.signUpButton).toHaveText("Sign up");
  //..bugs/registration-bugs.md > Bug-002 ("Sign up" button remains disabled after all required fields are filled in)
  await expect(registrationPage.signUpButton).toBeEnabled();

  await registrationPage.clickSignUpButton();
  await toast.waitForVisible(toastMessages.successfulRegistration);
  await expect(toast.toastMessage.first()).toHaveText(
    toastMessages.successfulRegistration
  );

  await expect(page).toHaveURL(homePage.url);

  await header.goToProfile();
  await expect(profilePage.username).toHaveText(requiredFields.username);
  expect(await profilePage.publicInfoValue.innerText()).toContain(
    requiredFields.username
  );
});

test("Register with required and optional fields", async ({
  page,
  registrationPage,
  homePage,
  profilePage,
  header,
  toast,
  toastMessages,
  testUser,
}) => {
  allFields = testUser.generateAllFields();
  await registrationPage.setAllFields(allFields);

  //..bugs/registration-bugs.md > Bug-001 (Incorrect button label of "Sign up" button)
  //await expect(registrationPage.signUpButton).toHaveText("Sign up");
  await expect(registrationPage.signUpButton).toBeEnabled();

  await registrationPage.clickSignUpButton();

  await toast.waitForVisible(toastMessages.successfulRegistration);
  await expect(toast.toastMessage.first()).toHaveText(
    toastMessages.successfulRegistration
  );

  await expect(page).toHaveURL(homePage.url);

  await header.goToProfile();
  await expect(profilePage.username).toHaveText(allFields.username);
  expect(await profilePage.publicInfoValue.innerText()).toContain(
    allFields.username
  );
  //..bugs/registration-bugs.md > Bug-003 ("Public info" value entered during registration is not displayed on Profile page)
  expect(await profilePage.publicInfoValue.innerText()).toContain(
    allFields.publicInfoValue
  );
});

test("Register with existing credentials", async ({
  page,
  registrationPage,
  loginPage,
  header,
  headerUI,
  toast,
  toastMessages,
  testUser,
}) => {
  allFields = testUser.generateAllFields();

  await test.step("Register with valid credentials", async () => {
    await registrationPage.setAllFields(allFields);
    await registrationPage.clickSignUpButton();

    await toast.waitForVisible(toastMessages.successfulRegistration);
    await expect(toast.toastMessage.first()).toHaveText(
      toastMessages.successfulRegistration
    );
  });

  await test.step("Sign out", async () => {
    await header.signOut();
    await headerUI.loggedOutUI();
    await expect(page).toHaveURL(loginPage.url);
  });

  await test.step("Register again with same credentials", async () => {
    await registrationPage.navigate();
    await expect(page).toHaveURL(registrationPage.url);

    await registrationPage.setAllFields(allFields);
    await registrationPage.clickSignUpButton();
    await toast.waitForVisible(toastMessages.alreadyUsedCredentials);
    await expect(toast.toastMessage.first()).toHaveText(
      toastMessages.alreadyUsedCredentials
    );

    await expect(page).toHaveURL(registrationPage.url);
  });
});

test("Min-length validation disappears on valid input", async ({
  registrationPage,
  validations,
  testUser,
}) => {
  const minLenghtValidations = [
    {
      field: "username",
      shortValue: testUser.shortValues.username,
      minValidationMessage: validations.minUsernameChars,
    },
    {
      field: "password",
      shortValue: testUser.shortValues.password,
      minValidationMessage: validations.minPasswordChars,
    },
  ];

  for (const validation of minLenghtValidations) {
    await test.step(`Triggers min-length validation for ${validation.field}`, async () => {
      //Set short values
      if (validation.field === "username") {
        await registrationPage.setUsername(validation.shortValue);
      } else if (validation.field === "password") {
        await registrationPage.setPassword(validation.shortValue);
      }

      const messageElement = registrationPage.getValidationMessage(
        validation.field
      );
      await expect(messageElement).toHaveText(validation.minValidationMessage);

      await test.step(`Resolves min-length validation with min allowed chars for ${validation.field}`, async () => {
        //Extract the number of the validation message
        const messageValue = await messageElement.textContent();
        const minAllowedChars = parseInt(messageValue.match(/\d+/)[0], 10);

        //Set value with min allowed length
        allFields = testUser.generateAllFields();

        if (validation.field === "username") {
          await registrationPage.setUsername(
            allFields[validation.field].slice(0, minAllowedChars)
          );
        } else if (validation.field === "password") {
          await registrationPage.setPassword(
            allFields[validation.field].slice(0, minAllowedChars)
          );
        }

        //..bugs/registration-bugs.md > Bug-004 (Min-lenght validation on username input persists after entering min allowed characters)
        await expect(messageElement).not.toBeVisible();
      });
    });
  }
});

test("Max-length validation disappears on valid input", async ({
  registrationPage,
  validations,
  testUser,
}) => {
  const maxLenghtValidations = [
    {
      field: "username",
      longValue: testUser.tooLongValues.username,
      maxValidationMessage: validations.maxUsernameChars,
    },
    {
      field: "password",
      longValue: testUser.tooLongValues.password,
      maxValidationMessage: validations.maxPasswordChars,
    },
  ];

  for (const validation of maxLenghtValidations) {
    await test.step(`Triggers max length validation for ${validation.field}`, async () => {
      //Set long values
      if (validation.field === "username") {
        await registrationPage.setUsername(validation.longValue);
      } else if (validation.field === "password") {
        await registrationPage.setPassword(validation.longValue);
      }

      const messageElement = registrationPage.getValidationMessage(
        validation.field
      );
      await expect(messageElement).toHaveText(validation.maxValidationMessage);

      await test.step(`Resolves max-length validation with min allowed chars for ${validation.field}`, async () => {
        //Extract the number of the validation message
        const messageValue = await messageElement.textContent();
        const maxAllowedChars = parseInt(messageValue.match(/\d+/)[0], 10);

        //Set value with max allowed length
        allFields = testUser.generateAllFields();

        if (validation.field === "username") {
          await registrationPage.setUsername(
            allFields[validation.field].slice(0, maxAllowedChars)
          );
        } else if (validation.field === "password") {
          await registrationPage.setPassword(
            allFields[validation.field].slice(0, maxAllowedChars)
          );
        }

        await expect(messageElement).not.toBeVisible();
      });
    });
  }
});

test("Password mismatch validation disappears on valid input", async ({
  registrationPage,
  validations,
  testUser,
}) => {
  allFields = testUser.generateAllFields();
  await registrationPage.setPassword(allFields.password);
  await registrationPage.setConfirmPassword(allFields.password + "a");

  const messageElement =
    registrationPage.getValidationMessage("confirmPassword");

  await expect(messageElement).toHaveText(validations.mismatchedPasswords);

  await registrationPage.setConfirmPassword(allFields.password);
  await expect(messageElement).not.toBeVisible();
});

test("Password format validation disappears on valid input", async ({
  registrationPage,
  validations,
  testUser,
}) => {
  await registrationPage.setPassword("testpass");
  const messageElement = registrationPage.getValidationMessage("password");
  await expect(messageElement).toHaveText(validations.passwordRules);

  allFields = testUser.generateAllFields();
  await registrationPage.setPassword(allFields.password);
  await expect(messageElement).not.toBeVisible();
});

test("Validation for invalid birth date", async ({
  registrationPage,
  testUser,
}) => {
  const futureDateIso = testUser.generateCustomDate(1);
  const pastDateIso = testUser.generateCustomDate(-150);

  const invalidAges = [futureDateIso, pastDateIso];

  for (const date of invalidAges) {
    await registrationPage.setBirthDate(date);
    const messageElement = registrationPage.getValidationMessage("birthDate");

    //..bugs/registration-bugs.md > Bug-005 (Missing validation message for age restriction)
    await expect(messageElement).toBeVisible();

    allFields = testUser.generateAllFields();
    await registrationPage.setBirthDate(allFields.birthDateIso);
    await expect(messageElement).not.toBeVisible();
  }
});
