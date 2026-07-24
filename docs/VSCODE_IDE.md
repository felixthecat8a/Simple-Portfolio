<!-- Visual Studio Code -->
# Visual Studio Code

[![Edited with VS Code](https://img.shields.io/badge/edited_with-vscode-0078D4?style=for-the-badge)](https://code.visualstudio.com/)
[![NodeJS](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoSize=auto&logoColor=white)](https://nodejs.org)
[![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoSize=auto&logoColor=white)](https://yarnpkg.com/)
[![EditorConfig](https://img.shields.io/badge/EditorConfig-FEFEFE?style=for-the-badge&logo=editorconfig&logoSize=auto&logoColor=000)](https://editorconfig.org/)
[![CSpell](https://img.shields.io/badge/code_spell_checker-81af50?style=for-the-badge)](https://cspell.org/)
[![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoSize=auto&logoColor=F7BA3E)](https://prettier.io/)
[![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoSize=auto&logoColor=white)](https://eslint.org/)


## My VS Code Theme Setup

- Color Theme: [Nightingale](https://github.com/bfrangi/vscode-nightingale-theme)

- Icon Theme: [Fluent Icons](https://github.com/miguelsolorio/vscode-fluent-icons)

- Product Icon Theme: [vscode-icons](https://github.com/vscode-icons)

---

<!-- Environment -->
## Node.js/Yarn Environment Setup
<!-- Visual Studio Code -->
Download Visual Studio Code from [https://code.visualstudio.com/](https://code.visualstudio.com/).
<!-- Node.js -->
Download Node.js from [https://nodejs.org/en](https://nodejs.org/en).
<!-- Yarn Package Manager -->
Install Yarn via NPM:
```ps
npm install --global yarn
```

---
<!-- Editor Environment -->
## Editor Environment Configuration Settings
<!-- EditorConfig -->
### EditorConfig
>[***EditorConfig***](https://editorconfig.org/) helps maintain consistent coding styles across different editors and IDEs.
- Create a `.editorconfig` file in the root of your project to define rules like indentation, line endings, and whitespace.
- Install the **EditorConfig** extension in Visual Studio Code for automatic enforcement.

#### `.editorconfig`

```ini
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

---
<!-- CSpell -->
### CSpell
>[***CSpell***](https://cspell.org/)  is a spell checker for code, comments, and strings, ideal for maintaining clean and professional codebases.

- Create a `cspell.json` file to define allowed terms and custom dictionaries.
- Install the **Code Spell Checker** extension (by *Street Side Software*) in VS Code.

#### `cspell.json`

```json
{
  "version": "0.2",
  "language": "en",
  "words": ["lessc", "rgba"],
  "ignorePaths": ["node_modules", "dist"]
}
```
---

### Prettier
>[***Prettier***](https://prettier.io/) automatically formats code for consistency and readability.

- Install *Prettier* as a dev dependency.

```ps
yarn add --dev --exact prettier
```

- Create a `.prettierrc` to define rules and a `.prettierignore` to exclude files from formatting.

- Install the **Prettier** extension in Visual Studio Code.

#### `.prettierrc`

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "trailingComma": "es5",
  "bracketSpacing": true,
  "bracketSameLine": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

#### `.prettierignore`

```
node_modules/
coverage/
```
---
<!-- Linting -->
### Code Linting

>[**ESLint**](https://eslint.org/) is a powerful tool that helps you maintain code quality and consistency by identifying and fixing potential issues in your JavaScript or TypeScript code. It provides a set of rules and patterns to follow, making your codebase cleaner and more reliable.

- Install *ESLint*, *globals* and *eslint-config-prettier* as development dependencies.
- Install the **ESLint** extension in Visual Studio Code.

```shell
yarn add --dev eslint globals
yarn add --dev eslint-config-prettier
```

- Create an `eslint.config.mjs` file to define linting rules.

#### `eslint.config.js`

```js
const { defineConfig, globalIgnores } = require('eslint/config')
const js = require('@eslint/js')
const globals = require('globals')
const eslintConfigPrettier = require('eslint-config-prettier')

module.exports = defineConfig([
  js.configs.recommended,
  globalIgnores(['coverage/**/*']),
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.commonjs,
        ...globals.node,
        ...globals.browser,
        ...globals.mocha,
        ...globals.chai,
      },
    },
    rules: {
      /* Style / consistency */
      eqeqeq: ["error", "always"],          // use === instead of ==
      curly: ["error", "all"],              // enforce braces for all control blocks
      semi: ["error", "always"],            // require semicolons
      quotes: ["error", "double"],          // enforce double quotes
      indent: ["error", 2],                 // 2-space indentation
      "comma-dangle": ["error", "always-multiline"], // cleaner diffs in arrays/objects
      /* Code quality */
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // warn but allow _var
      "no-undef": "error",                    // disallow using undeclared vars
      "no-console": "off",                    // allow console.log (useful in Node)
      "no-var": "error",                      // prefer let/const
      "prefer-const": "error",                // prefer const when possible
      "no-empty": ["warn", { allowEmptyCatch: true }], // prevent accidental empty blocks
      /* Best practices */
      "handle-callback-err": "warn",          // remind to handle callback errors
      "callback-return": "warn",              // avoid multiple callbacks
      "consistent-return": "warn",            // functions should return consistently
    },
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: 'warn'
    },
  },
  eslintConfigPrettier,
])
```
---
<!-- Running Scripts from package.json -->
### Running Scripts

In the terminal:

- Run `yarn format` to format.
<!-- package.json -->
#### `package.json`

```json
{
  "scripts": {
    "format": "prettier --write src/ server/ test/ dist/",
    "lint": "eslint server/**/*.js test/**/*.js"
  }
}
```
