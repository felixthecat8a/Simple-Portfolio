<!-- Mocha.js Testing -->
# Mocha.js Testing
<!-- Badges -->
![JavaScript](https://img.shields.io/badge/--555?style=for-the-badge&logo=javascript&logoSize=auto&logoColor=F7DF1E)
[![Mocha](https://img.shields.io/badge/testing_with-Mocha-8D6748?style=for-the-badge&logo=Mocha&logoSize=auto&logoColor=white)](https://mochajs.org/)
[![ChaiJS]( https://img.shields.io/badge/Chai-faf4e8?style=for-the-badge&logo=chai&logoSize=auto&logoColor=A30701)](https://www.chaijs.com/)
<!-- Dependencies -->
## Dependencies
<!-- Mocha.js -->
### [Mocha.js](https://mochajs.org/)

***Mocha.js*** is a JavaScript testing framework that allows you to write, organize, and run unit tests efficiently. 
To configure Mocha, create a `.mocharc.yaml` or `.mocharc.js` file.
<!-- Chai.js -->
### [Chai.js](https://www.chaijs.com/)

***Chai.js*** is an assertion library that provides both BDD (`expect`, `should`) and TDD (`assert`) styles to validate test outcomes.
<!-- Sinon.js -->
### [Sinon.js](https://sinonjs.org)

***Sinon.js*** provides standalone test spies, stubs, and mocks that work with any testing framework, making it ideal for isolating and verifying complex behaviors.

- Install *Mocha*, *Chai* and *Sinon* as development dependencies.

```ps
yarn add --dev mocha chai sinon
```

- Add this script in your `package.json`:

```json
{
  "scripts": {
    "test": "mocha"
  }
}
```
- Or, refer to a config directory
```json
{
  "scripts": {
    "test": "mocha --config config/.mocharc.yaml"
  }
}
```

- To run test, open a terminal and run

```bash
yarn test
```

---

<!-- Code Coverage -->
# Code Coverage with [c8](https://github.com/bcoe/c8)

***c8*** is a code-coverage tool that uses Node.js' built in functionality and is compatible with Istanbul's reporters. Create a `.nycrc.json` to configure c8/Istanbul options.

### Install

```ps
yarn add --dev c8
```

### Configure: `.nycrc.json`

```json
{
  "all": true,
  "extension": [".js"],
  "include": ["server/**/*.js", "src/**/*.js"],
  "exclude": ["**/*.test.js", "**/*.spec.js"],
  "reporter": ["text", "html"],
  "report-dir": "./coverage",
  "cache": true,
  "check-coverage": false,
  "branches": 80,
  "lines": 80,
  "functions": 80,
  "statements": 80
}
```

### Script: `package.json`

```json
{
  "scripts": {
    "cov": "c8 mocha"
  }
}
```

### Usage

```bash
yarn cov
start coverage/index.html
```

> **Note:** The `start` command works on Windows. For macOS/Linux, use `open coverage/index.html`.

---

<!-- DOM Testing -->
# DOM Testing (Optional)
<!-- jsdom -->
[***jsdom***](https://github.com/jsdom/jsdom) simulates a browser environment in Node.js, allowing you to test DOM manipulation and browser-specific APIs without needing a real browser.

- Install *jsdom* as a development dependency:

```bash
yarn add --dev jsdom
```
