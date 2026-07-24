<!-- Mocha.js Testing -->
# Mocha.js Testing

![JavaScript](https://img.shields.io/badge/--555?style=for-the-badge&logo=javascript&logoSize=auto&logoColor=F7DF1E)
[![Mocha](https://img.shields.io/badge/testing_with-Mocha-8D6748?style=for-the-badge&logo=Mocha&logoSize=auto&logoColor=white)](https://mochajs.org/)
[![ChaiJS]( https://img.shields.io/badge/Chai-faf4e8?style=for-the-badge&logo=chai&logoSize=auto&logoColor=A30701)](https://www.chaijs.com/)
[![SinonJS]( https://img.shields.io/badge/Sinon-469a4c?style=for-the-badge)](https://sinonjs.org/)
<!-- Dependencies -->
## Dependencies
<!-- Mocha.js -->
### [Mocha.js](https://mochajs.org/)

***Mocha.js*** is a JavaScript testing framework that allows you to write, organize, and run unit tests efficiently. To configure Mocha, create a `.mocharc.yaml` or `.mocharc.js` file.
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
    "test": "mocha --config server/config/.mocharc.yaml"
  }
}
```

- In a terminal, run:

```bash
yarn test
```
<!-- Code Coverage -->
## Code Coverage with [c8](https://github.com/bcoe/c8)

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

<!-- DOM Testing -->
## DOM Testing (Optional)
<!-- jsdom -->
[***jsdom***](https://github.com/jsdom/jsdom) simulates a browser environment in Node.js, allowing you to test DOM manipulation and browser-specific APIs without needing a real browser.

- Install *jsdom* as a development dependency:

```bash
yarn add --dev jsdom
```
---

# Compiling LESS Files Using [Gulp.js](https://gulpjs.com/)

[![Gulp.js](https://img.shields.io/badge/automate_testing_with-Gulp.js-CF4647?style=for-the-badge&logo=gulp&logoSize=auto&logoColor=#CF4647)](https://gulpjs.com/)

***Gulp.js*** is an open-source JavaScript toolkit and task runner used to automate repetitive and time-consuming workflows in web development. It runs on Node.js and leverages its "streams" capability to process files in memory, making it significantly faster than older tools that write temporary files to a disk.

## Install Dependencies

```ps
yarn add --dev gulp gulp-mocha

```

## Setup: `gulpfile.js`

```js
const gulp = require('gulp')
const mochaImport = require('gulp-mocha')
const mocha = mochaImport.default || mochaImport

function test() {
  return gulp
    .src('test/*.js', { read: false })
    .pipe(
      mocha({
        reporter: 'nyan', // options: spec, dot, nyan, etc.
        timeout: 2000,
      })
    )
    .on('error', function (err) {
      console.error(err.stack || err.message)
      this.emit('end')
    })
}

exports.test = test
```

## Script: `package.json`

```json
{
  "scripts": {
    "test": "gulp test"
  }
}
```

## Usage

```ps
yarn test
```
---
