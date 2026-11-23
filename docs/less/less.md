# LESS Stylesheet

[![Less](https://img.shields.io/badge/styled_with-Less-1d365d?style=for-the-badge&logo=less&logoColor=white&logoSize=auto)](https://lesscss.org/)
![CSS](https://img.shields.io/badge/CSS-663399?style=for-the-badge&logo=css&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)

## Overview

[LESS](https://lesscss.org/) is a stylesheet language that extends CSS with variables, mixins, nested rules, operations, and functions.
These features make stylesheets easier to organize, reuse, and maintain.

The LESS compiler converts `.less` files into standard CSS.

The Clean CSS plugin is used to minify the generated stylesheet.

## Install Dependencies

Install LESS and the Clean CSS plugin:

```shell
yarn add --dev less less-plugin-clean-css
```

## Create Stylesheet

```text
src/
└── less/
    └── style.less
```

## Configure the Build Script

Add the following script to `package.json`:

```json
{
  "scripts": {
    "less": "lessc src/less/style.less dist/css/style.css",
    "less:min": "lessc src/less/style.less dist/css/style.min.css --clean-css"
  }
}
```

## Compile the Stylesheet

Run:

```shell
yarn less
```

or

```shell
yarn less:min
```

The compiler generates:

```text
dist/
└── css/
    └── style.css
```

## Using Stylelint with LESS

For LESS, you can use Stylelint to check your stylesheets for errors and enforce consistent coding conventions.
Unlike CSS, LESS requires an additional parser because it introduces syntax that standard CSS parsers don't understand.

### Install Stylelint, the standard configuration, and the LESS parser:
```shell
yarn add --dev stylelint stylelint-config-standard postcss-less
```
- Stylelint: Lints stylesheets and enforces coding conventions.
- `stylelint-config-standard`: Provides a predefined set of recommended rules.
- `postcss-less`: Allows Stylelint to parse LESS syntax.

### Create a `stylelint.config.cjs` file in the project root:
```js
module.exports = {
  extends: ['stylelint-config-standard'],
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
      rules: {
        'at-rule-no-unknown': null,
        'at-rule-prelude-no-invalid': null,
        'at-rule-descriptor-value-no-unknown': null,
        'declaration-property-value-no-unknown': null
      }
    }
  ]
}
```

Why disable these rules?

Some standard Stylelint rules validate against CSS specifications and don't fully understand LESS-specific syntax.
Disabling these rules for LESS files prevents false positives involving LESS variables, mixins, and functions.
Other standard Stylelint rules remain enabled.

### Add the following scripts to package.json:
```json
{
  "scripts": {
    "less": "lessc src/less/style.less dist/css/style.css",
    "less:min": "lessc src/less/style.less dist/css/style.min.css --clean-css",
    "lint:less": "stylelint \"src/less/**/*.less\"",
    "lint:less:fix": "stylelint \"src/less/**/*.less\" --fix"
  }
}
```

### To check your LESS stylesheets:
```shell
yarn lint:less
```
To automatically fix supported issues:
```shell
yarn lint:less:fix
```
Stylelint will report any remaining problems in your terminal.

## References

- [LESS Documentation](https://lesscss.org/)
- [Clean CSS](https://github.com/clean-css/clean-css)
- [Stylelint Documentation](https://stylelint.io/)
- [Stylelint Standard Configuration](https://github.com/stylelint/stylelint-config-standard)
- [PostCSS LESS](https://github.com/prettier/postcss-less)
