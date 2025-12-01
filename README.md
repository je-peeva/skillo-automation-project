# Skillo Social Media - Test Automation Suite

## 📖 Project Overview

This project automates testing of **Skillo Social Media Platform** (http://training.skillo-bg.com:4300/) - a web application designed to create public and private posts. The goal is to ensure the main functionality of application works correctly, meets quality standards, and provides a reliable user experience. The main functionalities include positive and negative automated tests for registration, login, logout and post creation.

---

## 🎯 Project Purpose

The automation suite is created to:

- Increase test coverage
- Reduce manual testing effort
- Detect regressions early
- Validate core user flows
- Ensure a stable and high-quality user experience

---

## 🛠️ Technologies Used

- **JavaScript** – Test scripting language
- **Playwright** – Browser automation (Chrome, Firefox, Safari)
- **Node.js** – Runtime environment
- **ESLint & Prettier** – Code quality and formatting tools

---

## 📋 Prerequisites

Before running the automation tests, make sure you have installed:

- Node.js 18.18+ (required for ESLint)
- npm 9+
- VS Code (recommended)
- ESLint and Prettier extensions

---

## 🚀 Installation & Setup

Follow these steps to set up the automation project on your local machine:

1. **Clone the repository**

```bash
git clone https://github.com/je-peeva/skillo-automation-project.git
cd skillo-automation-project
```

2. **Install dependencies**

```bash
npm install
```

3. **Install Playwright browsers**

```bash
npx playwright install
```

4. **Open project folder in VS Code**

VS Code will automatically suggest:

- ESLint extension
- Prettier extension

Accept the recommendations or add them manually.

---

## ▶️ Running Tests

After completing the installation and setup, you can run your Playwright tests with the following commands:

1. **Run all tests**

```bash
npx playwright test
```

2. **Run tests in a specific browser**

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

3. **Run a specific test**

```bash
npx playwright test -g "{TestName}"
```

4. **View test report**
   After running tests, open the HTML report:

```bash
npx playwright show-report
```

## 📁 Project Structure

```bash

SKILLO-AUTOMATION-PROJECT
│
├── .vscode                           # VS Code configuration files
│   ├── extensions.json               # Recommended extensions
│   └── settings.json                 # Workspace ESLint/Prettier settings
│
├── bugs                              # Documentations of known issues
│  ├── new-post-bugs.md               # Found bugs for post creation
│  └── registration-bugs.md           # Found bugs for registration
│
├── pages                             # Page Object Model classes
│  ├── EditUserModal.js               # POM for edit user modal on Profile page
│  ├── Header.js                      # POM for Header component
│  ├── HomePage.js                    # POM for main Home page
│  ├── LoginPage.js                   # POM for Login page
│  ├── NewPostPage.js                 # POM for New post page
│  ├── PostModal.js                   # POM for post modal on Profile page
│  ├── ProfilePage.js                 # POM for Profile page
│  ├── RegistrationPage.js            # POM for Registration page
│  └── Toast.js                       # POM for notification (toast) messages
│
├── test-cases                        # Manual test cases documentation
│  ├── login-tests.md                 # Step by step test cases for login
│  ├── logout-tests.md                # Step by step test cases for logout
│  ├── new-post-tests.md              # Step by step test cases for post creation
│  └── registration-tests.md          # Step by step test cases for user registration
│
├── tests                             # Automated tests
│ ├── fixtures                        # Shared test setup/data
│ │   ├── test-data
│ │   │   ├── data-generators.js      # Data generators used for test data creation
│ │   │   ├── page-titles.js          # Page titles used for tests assertions
│ │   │   ├── static-data.js          # Static data used for tests
│ │   │   ├── toast-messages.js       # Toast messages used for tests assertions
│ │   │   └── validation-messages.js  # Validation messages used for tests assertions
│ │   └── combined-fixtures.js        # Custom Playwright fixtures (extended test)
│ ├── login.spec.js                   # Login tests
│ ├── logout.spec.js                  # Logout tests
│ ├── newPost.spec.js                 # New post tests
│ └── registration.spec.js            # Registration tests
│
├── upload-files                      # Sample files for post creation
│   ├── cheetah.webp                  # Forbidden file format
│   ├── fox.jpg                       # Allowed file format
│   └── waterfall.jpg                 # Allowed file format
│
├── .gitignore                        # Git ignore files
├── eslint.config.mjs                 # ESLint configuration
├── package.json                      # NPM dependencies
├── playwright.config.js              # Playwright test configuration
└── README.md                         # Project documentation

```

## 🧪 Test Scenarios

### Registration Tests

- [Registration Test Cases](./test-cases/registration-tests.md)  
  Tests covering user registration flow and detailed input validation behavior.

### Login Tests

- [Login Test Cases](./test-cases/login-tests.md)  
  Tests covering user login with valid/invalid credentials and error messages.

### Logout Tests

- [Logout Test Cases](./test-cases/logout-tests.md)  
  Tests covering user logout and session termination.

### New Post Tests

- [New Post Test Cases](./test-cases/new-post-tests.md)  
  Tests covering creation of new posts, validation, and file uploads.

## 📊 Test Coverage

- Total test cases: 19
- Positive tests: 6
- Negative tests: 13

### Breakdown by functionality:

- Registration: 8 (2 positive, 6 negative)
- Login: 3 (1 positive, 2 negative)
- Logout: 2 (1 positive, 1 negative)
- New Post: 6 (2 positive, 4 negative)

## 🏗️ Architecture

This project uses the Page Object Model design pattern to keep the tests clean, readable, and maintainable.

- Each component of the application has a separate class in the pages/ directory.
- All selectors and common UI interactions are encapsulated inside these classes.
- Fixtures eliminate repetitive setup logic and make the tests more stable and easier to maintain.
- Data generators ensure the test run uses fresh input.

## 🐛 Known Issues

Bugs found by executing of test suites:

### Registration Tests

- [Registration Bugs](./bugs/registration-bugs.md)

### New Post Tests

- [New Post Bugs](./bugs/new-post-bugs.md)

## 🔮 Future Improvements

This foundation prepares the workspace for advanced QA automation topics such as:

- extending the test cases for login, logout, post creation, registration,
- adding new component in order to cover all components in the application.

## 👤 Author

Zhenya Peeva
[https://github.com/je-peeva]
