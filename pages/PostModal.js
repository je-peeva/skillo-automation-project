export class PostModal {
  constructor(page) {
    this.page = page;

    //Locators
    this.modal = this.page.locator(".modal-content");
    this.username = this.modal.locator(".post-user");
    this.postTitle = this.modal.locator(".post-title");
    this.imageName = this.modal.locator(".post-modal-img > img");
    this.deleteLabel = this.modal.locator(".post-info .delete-ask");
    this.deleteButtons = this.modal.locator(".delete-confirm .btn");
  }

  async getUsernameId() {
    const href = await this.username.getAttribute("href");
    return href.split("/").pop();
  }

  async getPostTitle() {
    return this.postTitle.innerText();
  }

  async getImageName() {
    const src = await this.imageName.getAttribute("src");
    return src.split("/").pop();
  }

  async clickDelete() {
    await this.deleteLabel.click();
  }

  async confirmDeletion() {
    await this.deleteButtons.filter({ hasText: "Yes" }).click();
  }

  async closeModal() {
    await this.page.keyboard.press("Escape");
    await this.modal.waitFor({ state: "detached" });
  }

  async deletePost() {
    await this.clickDelete();
    await this.confirmDeletion();
  }
}
