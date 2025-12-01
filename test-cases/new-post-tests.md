# New Posts Test Suite

The New Posts Test Suite verifies the post creation functionality of the Skillo Social Media Platform.
It covers positive scenarios for creating public and private posts, as well as negative scenarios verifying UI validations, file restrictions, and behavior when closing the post creation modal.

---

## 1: Create post (Positive tests)

### <u>Test case 1:</u> Create public post

**Description**: Verify a user can create a public post.

**Precondition**: New Post page is loaded.

**Steps**:

1. Upload a valid file format.
2. Populate valid caption.
3. Switch the toggle to "Public" option.
4. Click on "Create post" button.

**Expected result**:

1. Toast message "Post created!" is displayed.
2. The user is redirected to Profile page.
3. "Public" sub-tab is selected.
4. Newly created post is visible on "Public" and "All" sub-tabs in Profile page.

--

### <u>Test case 2:</u> Create private post

**Description**: Verify a user can create a private post.

**Precondition**: Have a logged in user.

**Steps**:

1. Go to Profile page.
2. Click on "New post" button.
   - **Expected result**: New Post page is displayed.
3. Upload a valid file format.
4. Populate valid caption.
5. Switch the toggle to "Private" option.
6. Click on "Create post" button.

**Expected result**:

1. Toast message "Post created!" is displayed.
2. The user is redirected to Profile page.
3. "Private" sub-tab is selected by default.
4. Newly created post is visible on "Private" and "All" sub-tabs in Profile page.

## 2: Validations (Negative tests)

### <u>Test case 3:</u> Validation for missing image

**Description**: Verify warning toast message appears when creating a post without an image.

**Precondition**: New Post page is loaded.

**Steps**:

1. Do not upload image.
2. Populate a valid caption.
3. Click on "Create post" button.

**Expected result**:

1. Toast message "Please upload an image!" is displayed.
2. New post page remains displayed.

--

### <u>Test case 4:</u> Validation for missing caption

**Description**: Verify warning toast message appears when creating post without a caption.

**Precondition**: New Post page is loaded.

**Steps**:

1. Upload a valid file format.
2. Leave caption input empty.
3. Click on "Create post" button.

**Expected result**:

1. Toast message "Please enter caption!" is displayed.
2. New post page remains displayed.

--

### <u>Test case 5:</u> Validation for forbidden files

**Description**: Verify warning toast message appears when uploading forbidden file format.

**Precondition**: New Post page is loaded.

**Steps**:

1. Upload an invalid file format.
2. Populate valid caption.
3. Click on "Create post" button.

**Expected result**:

1. Toast message "Creation of post failed!" is displayed.
2. New post page remains displayed.
3. All fields are auto-cleared.

## 3: Close post creation (Negative tests)

### <u>Test case 6:</u> Post not created after closing

**Description**: Verify new post data is not published once it is closed.

**Precondition**: New Post page is loaded.

**Steps**:

1. Upload a valid file format.
2. Populate valid caption.
3. Click on "Close" modal button.

**Expected result**:

1. User is redirected to Profile page.
2. Posts count on Profile page remains unchanged.
3. Posts in "All" sub tab remain unchanged.

---
