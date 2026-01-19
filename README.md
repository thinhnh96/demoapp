# 🎭 Playwright Automation Test Framework

## Overview

This project is a production-ready Playwright automation test framework built to demonstrate Senior QA Automation practices, including:

- Clean architecture (Page Object Model)

- Multi-environment configuration (local / qa / staging / ci)

- Session reuse for fast execution

- Parallel cross-browser testing

- CI/CD integration with GitHub Actions

- Secure secrets handling (GitHub Secrets)

- Real-world test flows (Login, Checkout)

Target demo website:
👉 https://www.saucedemo.com (industry-standard public demo site)

## Goals of This Project

- This repository is designed to prove:

- Ability to design a scalable automation framework

- Understanding of CI/CD pipelines

- Experience with environment management & secrets

- Knowledge of test optimization (storageState, parallelism)

- Senior-level thinking, not just writing tests

## 1. Tech Stack
Tool	                  Purpose
Playwright	            E2E Automation
TypeScript	            Strong typing & maintainability
Page Object Model	      Clean test architecture
dotenv	                Environment config (local only)
GitHub Actions	        CI pipeline
GitHub Secrets	        Secure credentials

## 2. Project Structure

.
├── configs/
│   └── env.ts                 # Centralized environment loader
│
├── pages/                     # Page Object Model (POM)
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── tests/
│   ├── auth/                  # Login & authentication tests
│   │   └── login.spec.ts
│   │
│   ├── order/                 # Business flows (reuse session)
│   │   ├── add-to-cart.spec.ts
│   │   └── checkout.spec.ts
│   │
│   ├── setup/                 # Authentication setup (store session)
│   │   ├── auth.chrome.setup.ts
│   │   └── auth.firefox.setup.ts
│   │
│   └── test-data/             # Test data (users, items, checkout info)
│       ├── users.ts
│       ├── items.ts
│       └── datacheckout.ts
│
├── storage/                   # Stored browser sessions (gitignored)
│
├── .env.local                 # Local environment variables
├── .env.qa                    # QA environment variables
├── .env.staging               # Staging environment variables
├── .env.ci                    # CI environment variables
│
├── playwright.config.ts       # Playwright global configuration
├── package.json
└── README.md


---

## 3. Environment Configuration

### Supported Environments

* `local`
* `qa`
* `staging`
* `ci`

### Example `.env.local`


BASE_URL=https://www.saucedemo.com
USERNAME=standard_user
PASSWORD=secret_sauce

### Environment Loader (`configs/env.ts`)

* Automatically loads `.env.<environment>`
* Uses **safe defaults** if not explicitly specified
* Throws clear error only when critical variables are missing

ENV=qa npx playwright test

---

## 4️⃣ Playwright Configuration Highlights

### 🔹 Multi-browser execution

* Chromium
* Firefox

### 🔹 Environment-aware behavior

| Feature    | Local | CI |
| ---------- | ----- | -- |
| Retries    | 0     | 2  |
| Workers    | auto  | 2  |
| forbidOnly | ❌     | ✅  |

### 🔹 Shared `use` configuration

* `baseURL` from env
* Screenshot on failure
* Trace on first retry
* Video retained on failure

---

## 5️⃣ Page Object Model (POM)

Each page encapsulates:

* Locators
* User actions
* Assertions

### Example: `LoginPage`

* `login(username, password)`
* `expectLoginSuccess()`
* `expectLoginError(message)`

All pages inherit from `BasePage` for common utilities:

* `verifyPageTitle()`
* `goTo(path)`

---

## 6️⃣ Stored Authentication Session 

### Problem

* Logging in for every test is slow and flaky
* Business tests should not depend on login UI

### Solution

Use **Playwright storageState**:

1. Login **once** in setup tests
2. Save cookies & localStorage
3. Reuse session across all business tests

### Setup Tests

tests/setup/
├── auth.chrome.setup.ts
└── auth.firefox.setup.ts

### Stored Files

storage/
├── auth.chrome.json
└── auth.firefox.json

### Usage in Business Tests

use: {
  storageState: 'storage/auth.chrome.json'
}

### Benefits

- Faster execution (~60–70%)
- Stable tests
- Login logic isolated
- Business logic focused

---

## 7️⃣ Test Design Strategy

### Authentication Tests

* Validate login success
* Edge cases:

  * Empty username
  * Empty password
  * Invalid credentials
  * Locked user

### Business Flow Tests

* Add to cart
* Checkout success
* Validation errors


---

## 8️⃣ CI/CD Ready

### CI-friendly features

* Headless execution
* Retry on failure
* HTML report generation
* Environment-based config

### Example CI Command

ENV=ci npx playwright test

---

## 9️⃣ Best Practices Applied

✔ Separation of concerns
✔ Environment isolation
✔ Page Object Model
✔ Test data externalization
✔ Session reuse
✔ Multi-browser coverage
✔ CI-ready configuration

---

## 🔟 How to Run

### Install dependencies

npm install

### Run tests (default local)
npx playwright test

### Run specific environment

ENV=qa npx playwright test

### Run specific test

npx playwright test tests/auth/login.spec.ts

---

###Conclusion

This framework demonstrates:

* Practical automation testing experience
* Production-ready architecture
* Understanding of CI/CD constraints
* Focus on stability, speed, and maintainability

-------------
**Author:** Thinhhn
