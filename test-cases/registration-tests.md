# Registration Test Suite

The Registration Test Suite verifies the user registration functionality of the Skillo Social Media Platform. It includes positive scenarios for successful registration with required and optional fields, negative scenarios for duplicate credentials, and comprehensive input validation checks such as character length, password rules, and birth date constraints to ensure proper error handling.

---

## 1: Successful Registration (Positive tests)

### <u>Test case 1:</u> Register with required fields

**Description**: Verify a new user can successfully register using only required fields with valid data.

**Steps**:

1. Go to Registration page.
2. Fill in all required fields within the form using valid data. _(currently only "Public info" is optional field)_
3. Click on "Sign up" button.

**Expected result**:

1. Toast message "Successful register!" is displayed.
2. The user is automatically logged in.
3. The user is redirected to Home page.
4. Username on "Profile" page matches the logged in user.

--

### <u>Test case 2:</u> Register with required and optional fields

**Description**: Verify a new user can successfully register using required and optional fields with valid data.

**Steps**:

1. Go to Registration page.
2. Fill in all required and optional fields within the form using valid data.
3. Click on "Sign up" button.

**Expected result**:

1. Toast message "Successful register!" is displayed.
2. The user is automatically logged in.
3. The user is redirected to Home page.
4. Username and public info on "Profile" page matches the newly registered user.

---

## 2: Unsuccessful Registration (Negative tests)

### <u>Test case 3:</u> Register with existing credentials

**Description**: Verify a user cannot be registered using already existing credentials.

**Steps**:

1. Go to Registration page.
2. Fill in the registration form using credentials of already registered user.
3. Click on "Sign up" button.

**Expected result**:

1. Toast message "Username taken" is displayed.
2. Registration page remains displayed.

## 3: Input Validation & Error Handling (Negative tests)

## 3.1. Character length validation

### <u>Test case 4:</u> Min-length validation disappers on valid input

**Description**: Verify min-lenght validation disappears once populating allowed minimum of characters.

**Steps**:

1. Go to Registration page.
2. Fill in a value below the minimum allowed length within each field of the registration form.

- **Expected result**: Validation message "Minimum {N} characters !" is displayed.

3. Fill in a value matching the allowed minimum of characters.

- **Expected result**: Validation message "Minimum {N} characters !" is hidden.

--

### <u>Test case 5:</u> Max-length validation disappers on valid input

**Description**: Verify max-length validation disappears once populating allowed maximum of characters.

**Steps**:

1. Go to Registration page.
2. Fill in a value above the maximum allowed length within each field of the registration form.

- **Expected result**: Validation message "Maximum {Y} characters!" is displayed.

3. Fill in a value matching the allowed maximum of characters.

**Expected result**: Validation message "Maximum {Y} characters!" is hidden.

## 3.2. Password validation

### <u>Test case 6:</u> Password mismatch validation disappears on valid input

**Description**: Verify password mismatch validation disappears once populating mismatching password and confirm password values.

**Steps**:

1. Go to Registration page.
2. Fill in "Password" field with valid value. _(Must contain digit and uppercase letter!)_
3. Fill in "Confirm Password" with mismatching value.

- **Expected result**: Validation message "Passwords do not match!" is displayed below "Confirm Password" input.

4. Fill in "Confirm Password" with matching value.

- **Expected result**: Validation message "Passwords do not match!" is hidden.

--

### <u>Test case 7:</u> Password format validation disappears on valid input

**Description**: Verify password format validation disappears once populating a value mathing the rules.

**Steps**:

1. Go to Registration page.
2. Fill in "Password" field using at least 6 lowercase letters.

- **Expected result**: Validation message "Must contain digit and uppercase letter!" is displayed below "Password" input.

3. Fill in "Password" field using avalid value. _(Must contain digit and uppercase letter!)_.

- **Expected result**: Validation message "Must contain digit and uppercase letter!" is hidden.

## 3.3. Birth date validation

### <u>Test case 8:</u> Birth date validation disappears on valid input

**Description**: Verify birth date validation disappears once populating valid birth date.

**Steps**:

1. Go to Registration page.
2. Fill in "Birth Date" field using date in a way:

- younger than minimum age _(e.g. < 18 years / future date (not yet born))_
- older than maximum age _(e.g. > 150 years)_

- **Expected result**: Validation message for minimum and maximum allowed age is displayed below "Birth date" input.

3. Fill in "Birth Date" field using valid age.

- **Expected result**: Validation message for minimum and maximum allowed age is hidden.

---
