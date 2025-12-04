## Bug-001

**Title:** Creating a private post redirects incorrectly to "Public" tab on Profile page  
**Severity:** Low  
**Priority:** Medium  
**Found by test case:** `tests/newPost.spec.js > Create a private post`

### Steps to Reproduce:

1.  Login to Skillo platform.
2.  Go to "New Post" page.
3.  Upload \*.jpg file using "Browse" button.
4.  Fill in a caption input.
5.  Switch the toggle to "Private" option.
6.  Click on "Create post" button.

### Actual Result:

1.  A green toast message appears: "Post created!"
2.  User is redirected to "Public" sub tab on Profile page.
3.  Newly created post is not visible.

### Expected Result:

1. User should be redirected to Profile page.
2. Default opened sub tab should match the selected privacy toggle state.
3. Newly created post should be displayed as last one.

### Notes:

The issue is not reproducible when creating public post.

---

## Bug-002

**Title:** Privacy toggle changes automaticaly when submitting a post with an invalid file format
**Severity:** Low  
**Priority:** Low  
**Found by test case:** `tests/newPost.spec.js > Validation for forbidden files`

### Steps to Reproduce:

1.  Login to Skillo platform.
2.  Go to "New Post" page.
3.  Upload \*.webp file using "Browse" button.
4.  Fill in a caption input.
5.  Do not change the privacy toggle _("Public" option is set by default.)_
6.  Click on "Create post" button.

### Actual Result:

1.  Privacy toggle is automatically switched to "Private" option.
2.  Caption input is cleared.

### Expected Result:

Privacy toggle should keep its initial value.

### Notes:

1. The issue is reproducible when toggle is manually switched to "Public" option.
2. The issue is not reproducible when toggle is manually switched to "Private" option.
3. The issue is not reproducible when caption is not filled.
4. The issue is not reproducible when valid file format is uploaded.
5. The issue is related with `bugs/new-post-bugs.md > Bug-003 (Inconsistent input behaviour when submitting a post with an invalid file format)`

---

## Bug-003

**Title:** Inconsistent input behaviour when submitting a post with an invalid file format
**Severity:** Low  
**Priority:** Low  
**Found by test case:** `tests/newPost.spec.js > Validation for forbidden files`

### Steps to Reproduce:

1.  Login to Skillo platform.
2.  Go to "New Post" page.
3.  Upload \*.webp file using "Browse" button.
4.  Fill in a caption input.
5.  Switch the privacy toggle to "Private" option.
6.  Click on "Create post" button.

### Actual Result:

1. Caption input is cleared.
2. Uploaded image, file name field and privacy toggle are not reset.

### Expected Result:

All fields should have consistent behaviour.

### Notes:

1. The issue is reproducible when submitting without a caption - all other fields remain unchanged.
2. The issue is related with `bugs/new-post-bugs.md > Bug-002 (Privacy toggle changes automaticaly when submitting a post with an invalid file format)`

---
