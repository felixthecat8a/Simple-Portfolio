const { defineConfig, globalIgnores } = require('eslint/config')
const js = require('@eslint/js')
const globals = require('globals')
const eslintConfigPrettier = require('eslint-config-prettier')

module.exports = defineConfig([
  js.configs.recommended,
  globalIgnores(['coverage/**/*', 'dist', 'build']),
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      ecmaVersion: 'latest',
      globals: {
        ...globals.commonjs,
        ...globals.node,
      },
    },
    rules: {
      /* ----- Best Practices ----- */
      eqeqeq: ['error', 'always', { null: 'ignore' }], // require === and !==
      curly: ['error', 'all'], // always use {}
      'no-var': 'error', // Require let/const instead of var
      'prefer-const': 'error', // enforce const when let never reassigned
      'dot-notation': 'error', // enforce obj.prop over obj["prop"]
      'prefer-template': 'error', // enforce template strings

      /* ----- Possible Bugs ----- */
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-undef': 'error', // disallow undeclared vars
      'no-console': 'off', // allow console
      'no-debugger': 'warn',
      'no-prototype-builtins': 'warn', // avoid direct obj.hasOwnProperty
      'no-empty': ['warn', { allowEmptyCatch: true }],

      /* ----- Code Quality ----- */
      'prefer-promise-reject-errors': 'error',
      'require-atomic-updates': 'error', // avoid race conditions with await
      'no-duplicate-imports': 'error',
      'no-useless-return': 'warn',
      'max-params': ['warn', 5],
      'max-depth': ['warn', 5],
      'max-nested-callbacks': ['warn', 5],
      complexity: ['warn', { max: 14 }], //Default: 'complexity': ['warn', 10],
      'max-statements': ['off', { max: 10 }],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'default-case': 'warn',
    },
    linterOptions: { noInlineConfig: false, reportUnusedDisableDirectives: 'warn' },
  },
  {
    files: ['src/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      globals: {
        ...globals.mocha,
        ...globals.chai,
      },
    },
  },
  eslintConfigPrettier,
])
