import { test, expect } from "./fixtures/combined-fixtures.js";
import path from "node:path";

const validImages = [
  path.resolve("upload-files/fox.jpg"),
  path.resolve("upload-files/waterfall.jpg"),
];

const invalidImage = path.resolve("upload-files/cheetah.webp");

test.beforeEach(
  "Navigate to New Post page",
  async (
    {
      page,
      login,
      header,
      profilePage,
      newPostPage,
      state,
      testUser,
      pageTitles,
    },
    testInfo
  ) => {
    await login(testUser.validLoginWithEmail);

    await header.goToProfile();

    await profilePage.clickAllTab();
    state.initialAllPostsCount = await profilePage.getPostListCount();

    await profilePage.clickPublicTab();
    state.initialPublicPostsCount = await profilePage.getPostListCount();

    await profilePage.clickPrivateTab();
    state.initialPrivatePostsCount = await profilePage.getPostListCount();

    if (testInfo.title !== "Create private post") {
      await header.goToNewPost();

      await expect(page).toHaveURL(newPostPage.url);
      await expect(newPostPage.heading).toHaveText(pageTitles.newPostPage);
    }
  }
);

test.afterEach(
  "Delete post",
  async ({ header, profilePage, postModal, toast, toastMessages, state }) => {
    await header.goToProfile();

    await profilePage.clickAllTab();
    state.currentAllPostsCount = await profilePage.getPostListCount();

    while (state.currentAllPostsCount > state.initialAllPostsCount) {
      await profilePage.clickLastPost();
      await postModal.deletePost();

      await toast.waitForVisible(toastMessages.successfulDeletion);
      await expect(toast.toastMessage.first()).toHaveText(
        toastMessages.successfulDeletion
      );

      let updatedCount = await profilePage.getPostListCount();
      await expect(updatedCount).toBeLessThan(state.currentAllPostsCount);
      state.currentAllPostsCount = updatedCount;
    }
  }
);

test("Create public post", async ({
  page,
  profilePage,
  postModal,
  newPostPage,
  toast,
  toastMessages,
  state,
  testUser,
}) => {
  await test.step("Upload an image", async () => {
    await newPostPage.uploadImage(validImages[0]);
    state.imageName = path.basename(validImages[0]);
    await expect(await newPostPage.getUploadInputValue()).toBe(state.imageName);
  });

  await test.step("Fill post data and submit", async () => {
    state.caption = state.imageName + " je public caption";

    await newPostPage.setCaption(state.caption);
    await newPostPage.setPrivacyToggle("public");
    await newPostPage.clickCreatePostButton();

    await toast.waitForVisible(toastMessages.successfulPost);
    await expect(toast.toastMessage.first()).toHaveText(
      toastMessages.successfulPost
    );
    await expect(page).toHaveURL(profilePage.url);
    await expect(await profilePage.isTabActive("public")).toBe(true);

    state.currentPublicPostsCount = await profilePage.getPostListCount();
    await expect(state.currentPublicPostsCount).toBe(
      state.initialPublicPostsCount + 1
    );
  });

  await test.step("Validate new post in post modal", async () => {
    const lastImageName = await profilePage.getLastPostImageName();
    await profilePage.clickLastPost();

    expect(Number(await postModal.getUsernameId())).toBe(testUser.userId);
    expect(await postModal.getImageName()).toBe(lastImageName);
    expect(await postModal.postTitle.innerText()).toBe(state.caption);

    await postModal.closeModal();
  });
});

test("Create private post", async ({
  page,
  profilePage,
  postModal,
  newPostPage,
  pageTitles,
  toast,
  toastMessages,
  state,
  testUser,
}) => {
  await test.step("Upload an image", async () => {
    await profilePage.clickNewPostButton();
    await expect(page).toHaveURL(newPostPage.url);
    await expect(newPostPage.heading).toHaveText(pageTitles.newPostPage);

    await newPostPage.uploadImage(validImages[1]);
    state.imageName = path.basename(validImages[1]);
    expect(await newPostPage.getUploadInputValue()).toBe(state.imageName);
  });

  await test.step("Fill post data and submit", async () => {
    state.caption = state.imageName + " je private caption";
    await newPostPage.setCaption(state.caption);
    await newPostPage.setPrivacyToggle("private");
    await newPostPage.clickCreatePostButton();

    await toast.waitForVisible(toastMessages.successfulPost);
    await expect(toast.toastMessage.first()).toHaveText(
      toastMessages.successfulPost
    );
    await expect(page).toHaveURL(profilePage.url);
    //..bugs/new-post-bugs.md > Bug-001 (Creating a private post redirects incorrectly to public tab on Profile page)
    expect(await profilePage.isTabActive("private")).toBe(true);
    state.currentPrivatePostsCount = await profilePage.getPostListCount();
    await expect(state.currentPrivatePostsCount).toBe(
      state.initialPrivatePostsCount + 1
    );
  });

  await test.step("Validate new post in post modal", async () => {
    const lastImageName = await profilePage.getLastPostImageName();
    await profilePage.clickLastPost();

    expect(Number(await postModal.getUsernameId())).toBe(testUser.userId);
    expect(await postModal.getImageName()).toBe(lastImageName);
    expect(await postModal.postTitle.innerText()).toBe(state.caption);

    await postModal.closeModal();
  });
});

test("Validation for missing image", async ({
  page,
  newPostPage,
  toast,
  toastMessages,
  state,
}) => {
  state.initialActiveToggle = await newPostPage.getActiveToggleLabel();

  await newPostPage.setCaption("missing image");
  await newPostPage.clickCreatePostButton();

  await toast.waitForVisible(toastMessages.missingImage);
  await expect(toast.toastMessage.first()).toHaveText(
    toastMessages.missingImage
  );

  state.currentActiveToggle = await newPostPage.getActiveToggleLabel();
  await expect(state.initialActiveToggle).toBe(state.currentActiveToggle);
  await expect(page).toHaveURL(newPostPage.url);
});

test("Validation for missing caption", async ({
  page,
  newPostPage,
  toast,
  toastMessages,
  state,
}) => {
  state.initialActiveToggle = await newPostPage.getActiveToggleLabel();

  await newPostPage.uploadImage(validImages[1]);
  await newPostPage.clickCreatePostButton();

  await toast.waitForVisible(toastMessages.missingCaption);
  await expect(toast.toastMessage.first()).toHaveText(
    toastMessages.missingCaption
  );

  state.currentActiveToggle = await newPostPage.getActiveToggleLabel();
  await expect(state.initialActiveToggle).toBe(state.currentActiveToggle);
  await expect(page).toHaveURL(newPostPage.url);
});

test("Validation for forbidden files", async ({
  page,
  newPostPage,
  toast,
  toastMessages,
  state,
}) => {
  state.initialActiveToggle = await newPostPage.getActiveToggleLabel();

  await newPostPage.uploadImage(invalidImage);
  await newPostPage.setCaption("invalid image format");
  await newPostPage.clickCreatePostButton();

  await toast.waitForVisible(toastMessages.invalidFormat);
  await expect(toast.toastMessage.first()).toHaveText(
    toastMessages.invalidFormat
  );
  state.currentActiveToggle = await newPostPage.getActiveToggleLabel();
  //..bugs/new-post-bugs.md > Bug-002 (Privacy toggle changes automaticaly when submitting a post with invalid file format)
  await expect(state.initialActiveToggle).toBe(state.currentActiveToggle);
  await expect(page).toHaveURL(newPostPage.url);

  //..bugs/new-post-bugs.md > Bug-003 (Inconsistent input behaviour when submitting a post with invalid file format)
  await expect(newPostPage.captionInput).toBeEmpty();
  await expect(newPostPage.uploadInput).toBeEmpty();
});

test("Post not created after closing", async ({
  profilePage,
  newPostPage,
  state,
}) => {
  await newPostPage.uploadImage(validImages[0]);
  await newPostPage.setCaption("close creation");
  await newPostPage.clickCloseModalButton();

  await profilePage.clickAllTab();
  state.currentAllPostsCount = await profilePage.getPostListCount();
  await expect(state.initialAllPostsCount).toBe(state.currentAllPostsCount);
});
