import { test as base } from "@playwright/test";

import { pageObjects } from "./page-objects/page-objects-combined.js";
import { testData } from "./test-data/test-data-combined.js";
import { constantMessages } from "./constants/constants-combined.js";
import { headerHelper } from "./helpers/header-helpers.js";
import { loginHelper } from "./helpers/login-helper.js";
import { newPostState } from "./helpers/new-post-helpers.js";

export const test = base.extend({
  ...pageObjects,
  ...testData,
  ...constantMessages,
  ...headerHelper,
  ...loginHelper,
  ...newPostState,
});

export { expect } from "@playwright/test";
