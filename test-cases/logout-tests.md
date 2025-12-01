# Logout Test Suite

The Logout Test Suite verifies the session termination functionality of the Skillo Social Media Platform.
It includes positive and negative scenarios to ensure that users can successfully log out and that restricted content cannot be accessed after logout.

---

## 1: Successful Logout (Positive test)

### <u>Test case 1:</u> Successful logout

**Description**: Verify a user can successfully logout from the application.

**Precondition**: Have a registered user.

**Steps**:

1. Go to Login page.
2. Login successfully.
   - **Expected result**: "Sign out" button is displayed.
3. Click on "Sign out" button.

**Expected result**:

1. Toast message "Successful logout!" is displayed.
2. The user is redirected to Login page.
3. "Sign out" button is hidden.
4. Profile and New post link are not visible in the header.

## 2: Restricted access after logout (Negative test)

### <u>Test case 2:</u> Аccess restricted pages after logout

**Description**: Verify pages accessiable after login are not reachable by logged-out user.

**Precondition**: Have a registered user.

**Steps**:

1. Go to Login page.
2. Login successfully.
   - **Expected result**: "Profile" and "New Post" links become visible and functional.

3. Click on "Sign out" button.
   - **Expected result**:
     1. Toast message "Successful logout!" is displayed.
     2. The user is redirected to Login page.
     3. Profile and New post links are not visible.
     4. "Sign out" button is hidden.

4. Attempt to access the "Profile" and "New Post" pages directly.
   - **Expected result**:
     1. Toast message "You must be logged in in order to see this page!" is displayed.
     2. User remains on Login page.

---
