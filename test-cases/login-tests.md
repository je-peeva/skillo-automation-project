# Login Test Suite

The Login Test Suite verifies the authentication functionality of the Skillo Social Media Platform.
It includes both positive and negative scenarios to ensure correct handling of valid, invalid, and missing user credentials.

---

## 1: Successful Login (Positive test)

### <u>Test case 1:</u> Login with valid credentials

**Description**: Verify a registered user can successfully login using valid data.

**Precondition**: Have a registered user.

**Steps**:

1. Go to Login page.
2. Populate all required fields within the form using valid data.
3. Click on "Sign in" button.

**Expected result**:

1. Toast message "Successful login!" is displayed.
2. The user is redirected to Home page.
3. Profile and New post link are now visible in the header.
4. Username of the logged in user is displayed in Profile page.

## 2: Unsuccessful Login (Negative tests)

### <u>Test case 2:</u> Login with invalid credentials

**Description**: Verify a user cannot login using invalid credentials.

**Precondition**: Have a registered user.

**Steps**:

1. Go to Login page.
2. Populate all required fields within the form using invalid data for one of them.
3. Click on "Sign in" button.

**Expected result**:

1. Toast message "Wrong username or password!" is displayed.
2. The user remains on Login page.
3. Profile and New post link are not visible in the header.

---

### <u>Test case 3:</u> Login with missing credentials

**Description**: Verify a user cannot login using missing credentials.

**Precondition**: Have a registered user.

**Steps**:

1. Go to Login page.
2. Leave one or both of the required fields empty.

**Expected result**:

1. "Sign in" button remains disabled.
2. The user remains on Login page.
3. Profile and New post link are not visible in the header.

---
