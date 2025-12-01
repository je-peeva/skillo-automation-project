export class ProfilePage {
  constructor(page, userId) {
    this.page = page;
    this.userId = userId;
    this.url = `/users/${userId}`;

    //Locators
    this.username = this.page.locator(".col-12 h2");
    this.privateSubTab = this.page.locator(".btn-private");
    this.publicSubTab = this.page.locator(".btn-public");
    this.allSubTab = this.page.locator(".btn-all");
    this.postList = this.page.locator("app-post-list app-post");
    this.image = this.page.locator("app-post .post-img >img");
    this.newPostButton = this.page.locator(".new-post-btn > a");
    this.editUserButton = this.page.locator(".fa-user-edit");
    this.publicInfoValue = this.page.locator('div[class="col-12"] > p');
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async clickPrivateTab() {
    await this.privateSubTab.click();
  }

  async clickPublicTab() {
    await this.publicSubTab.click();
  }

  async clickAllTab() {
    await this.allSubTab.click();
  }

  async clickLastPost() {
    await this.postList.last().click();
  }

  async clickNewPostButton() {
    await this.newPostButton.click();
  }

  async openEditUserModal() {
    await this.editUserButton.click();
  }

  async getLastPostImageName() {
    const src = await this.image.last().getAttribute("src");
    return src.split("/").pop();
  }

  async getPostListCount() {
    return await this.postList.count();
  }

  async isTabActive(tabName) {
    const tab = this.page.locator(`.btn-${tabName.toLowerCase()}`);
    const classValue = await tab.getAttribute("class");
    return classValue.includes("active");
  }
}
