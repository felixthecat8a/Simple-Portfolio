const { defineConfig, globalIgnores } = require('eslint/config')
const js = require('@eslint/js')
const globals = require('globals')
const eslintConfigPrettier = require('eslint-config-prettier')

module.exports = defineConfig([
  js.configs.recommended,
  globalIgnores(['coverage/**/*', 'dist/**/*']),
  {
    files: ['**/*.{js,mjs,cjs}'],
    // plugins: { js },
    // extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    rules: {
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-console': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.commonjs, ...globals.node, ...globals.mocha, ...globals.chai },
    },
  },
  eslintConfigPrettier,
])
