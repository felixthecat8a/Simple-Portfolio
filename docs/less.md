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
    "less": "lessc src/less/style.less dist/css/style.css --clean-css"
  }
}
```

## Compile the Stylesheet

Run:

```shell
yarn less
```

The compiler generates:

```text
dist/
└── css/
    └── style.css
```

## References

- [LESS Documentation](https://lesscss.org/)
- [Clean CSS](https://github.com/clean-css/clean-css)
