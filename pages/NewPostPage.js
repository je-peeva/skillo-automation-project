export class NewPostPage {
  constructor(page) {
    this.page = page;
    this.url = "/posts/create";

    //Locators
    this.heading = this.page.locator("h3");
    this.browseButton = this.page.locator("#choose-file");
    this.fileInput = this.page.locator(
      '.uploadfilecontainer>input[type="file"]'
    );
    this.uploadInput = this.page.locator(".input-group > input");
    this.captionInput = this.page.locator('[formcontrolname="caption"]');
    this.activeToggleLabel = this.page.locator(
      "label.post-status-label.active"
    );
    this.publicToggleLabel = this.page.locator("label[for='customSwitch2']");
    this.createPostButton = this.page.locator("#create-post");
    this.closeModalButton = this.page.locator(".return-btn > i");
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async clickBrowseButton() {
    await this.browseButton.click();
  }

  async uploadImage(fileToUpload) {
    await this.fileInput.setInputFiles(fileToUpload);
  }

  async clickCreatePostButton() {
    await this.createPostButton.click();
  }

  async clickCloseModalButton() {
    await this.closeModalButton.click();
  }

  async setCaption(caption) {
    await this.captionInput.fill(caption);
  }

  async getActiveToggleLabel() {
    const activeToggleLabel = (
      await this.activeToggleLabel.innerText()
    ).toLowerCase();
    return activeToggleLabel;
  }

  async setPrivacyToggle(toggleState) {
    const activeToggleLabel = await this.getActiveToggleLabel();

    if (activeToggleLabel !== toggleState.toLowerCase()) {
      await this.publicToggleLabel.click();
    }
  }

  async getUploadInputValue() {
    return await this.uploadInput.getAttribute("placeholder");
  }
}
