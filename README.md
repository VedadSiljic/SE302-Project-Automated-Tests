# SE302 Automated Tests Project
This repository contains the project for the SE302 course (Software Testing and Maintainance). The purpose of the project was to write automation tests for a website using Playwright. The website that these tests are written for is TOOLSHOP DEMO (https://practicesoftwaretesting.com).
### Dependencies
- Node.js
- npm

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/VedadSiljic/SE302-Project-Automated-Tests.git
   cd SE302-Project-Automated-Tests
   ```
2. Initialize the project:
   ```bash
   npm init
   ```
3. Install Playwright:
   ```bash
   npm install @playwright/test
   npx playwright install
   ```
### Run Tests
- Run All Tests
   ```bash
   npx playwright test
   ```
- Run All Tests (Headed Mode)
   ```bash
   npx playwright test --headed
   ```
- Run a Specific Test File
   ```bash
   npx playwright test <name-of-the-file>
   ```
