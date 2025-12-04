export const newPostState = {
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
};
