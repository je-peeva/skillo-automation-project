export const usernameValue = "jeSkilloTest";
export const passwordValue = "j3Sk1ll0";
export const emailValue = "jeSkillo@test.bg";
export const userId = 9856;

const shortValue = "j";
export const shortValues = {
  username: shortValue,
  password: shortValue,
};

const longValue = "tooLongStrValue22Chars";
export const tooLongValues = {
  username: longValue,
  password: longValue,
};

export const validLoginWithEmail = {
  email: emailValue,
  password: passwordValue,
};

export const validLoginWithUsername = {
  username: usernameValue,
  password: passwordValue,
};

export const invalidLoginWithEmail = {
  email: "jeSkillotest.bg",
  password: passwordValue,
};

export const invalidLoginWithUsername = {
  username: "je+Skillo_Test",
  password: passwordValue,
};

export const invalidLoginWithPassword = {
  email: emailValue,
  password: "badpassword",
};

export const missingEmail = {
  identifier: "",
  password: passwordValue,
};

export const missingPassword = {
  identifier: emailValue,
  password: "",
};
