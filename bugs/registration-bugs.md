## Bug-001

**Title:** Incorrect button label of "Sign up" button
**Severity:** Low  
**Priority:** Medium  
**Found by test case:** `tests/registration.spec.js > Register with required fields`

### Steps to Reproduce:

1.  Load the Skillo platform.
2.  Go to "Login" page.
3.  Click on "Register" link.

### Actual Result:

Button label below the registration form is "Sign in".

### Expected Result:

Button label should be "Sign up".

### Notes:

The issue is related with `bugs/registration-bugs.md > Bug-002 ("Sign up" button remains disabled after all required fields are populated)`

---

## Bug-002

**Title:** "Sign up" button remains disabled after all required fields are filled in
**Severity:** Medium  
**Priority:** Medium  
**Found by test case:** `tests/registration.spec.js > Register with required fields`

### Precondition:

Registration page is loaded.

### Steps to Reproduce:

1.  Fill in all required field with valid data. _(Currently only "Public info" field is optional.)_

### Actual Result:

"Sign up" button is disabled.

### Expected Result:

"Sign up" button should be enabled.

### Notes:

The issue is related with `bugs/registration-bugs.md > Bug-001 (Incorrect button label of "Sign up" button)`

---

## Bug-003

**Title:** "Public info" value entered during registration is not displayed on Profile page
**Severity:** Medium  
**Priority:** Medium  
**Found by test case:** `tests/registration.spec.js > Register with required and optional fields`

### Precondition:

Register a user by filling in all required and optional fields.

### Steps to Reproduce:

1. Login to Skillo platform.
2. Go to Profile page.

### Actual Result:

1. Username on Profile page matches the logged-in user.
2. Public info value is missing.

### Expected Result:

1. Username on Profile page should match the logged-in user.
2. Public info value should be visible within user information section.

### Notes:

Public info value is visible after saving it in edit user modal.

---

## Bug-004

**Title:** Min-lenght validation on username input persists after entering min allowed characters
**Severity:** Low  
**Priority:** Medium  
**Found by test case:** `tests/registration.spec.js > Min-length validation disappears on valid input`

### Precondition:

Registration page is loaded.

### Steps to Reproduce:

1. Enter 2 characters within username input.

### Actual Result:

Validation message "Minimum 2 characters !" remains displayed.

### Expected Result:

Validation message should be hidden once min allowed characters are entered.

### Notes:

1. The issue is not reproducible for min-lenght validation on any other field.
2. The issue is not reproducible for max-lenght validation on any field.

---

## Bug-005

**Title:** Missing validation message for age restriction
**Severity:** Low  
**Priority:** Low  
**Found by test case:** `tests/registration.spec.js > Validation for invalid birth date`

### Precondition:

Registration page is loaded.

### Steps to Reproduce:

1. Enter a future date within birth date field.

### Actual Result:

Validation message is not displayed.

### Expected Result:

Validation message indicating min/max allowed age should be displayed.

### Notes:

The issue is reproducible when entering past date that is not possible for living person.

---
