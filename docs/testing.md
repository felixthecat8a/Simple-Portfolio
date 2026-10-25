# Mocha Setup

![JavaScript](https://img.shields.io/badge/--555?style=for-the-badge&logo=javascript&logoSize=auto&logoColor=F7DF1E)
[![Mocha](https://img.shields.io/badge/testing_with-Mocha-8D6748?style=for-the-badge&logo=Mocha&logoSize=auto&logoColor=white)](https://mochajs.org/)
[![ChaiJS]( https://img.shields.io/badge/Chai-faf4e8?style=for-the-badge&logo=chai&logoSize=auto&logoColor=A30701)](https://www.chaijs.com/)

## Install

```bash
yarn add --dev mocha chai sinon
```

## Configure Mocha

Mocha supports configuration files to avoid repeating command-line options.

Create `.mocharc.json` or `.mocharc.yaml` in your project root:

### `.mocharc.json`

```json
{
  "spec": ["test/**/*.spec.js"],
  "extension": ["js", "cjs", "mjs"],
  "reporter": "spec",
  "color": true,
  "slow": 75,
  "timeout": 2000,
  "ui": "bdd"
}
```

### `.mocharc.yaml`

```yaml
spec:
  - "test/**/*.spec.js"
extension:
  - js
  - cjs
  - mjs
reporter: spec
color: true
slow: 75
timeout: 2000
ui: bdd
```

### Using `--config` (Optional)

Use `--config` when you want to specify a particular configuration file instead of relying on automatic discovery.

```bash
yarn mocha --config .mocharc.json
```

This is useful when:
- You keep configuration files in a separate directory.
- You have different configurations for different test environments.
- You want to explicitly select which configuration Mocha uses.

For normal projects, automatic discovery is usually sufficient.

## Run Tests

Add a script to `package.json`:

```json
{
  "scripts": {
    "test": "mocha"
  }
}
```

Run the tests:

```bash
yarn test
```
