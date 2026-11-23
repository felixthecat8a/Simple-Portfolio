# PostCSS & Autoprefixer

![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white)

## Overview

[PostCSS](https://postcss.org/) transforms CSS using JavaScript plugins.
[Autoprefixer](https://github.com/postcss/autoprefixer) is a PostCSS plugin that adds vendor prefixes to CSS declarations when required by the configured browser support targets.
*Autoprefixer* can generate browser-specific declarations from standard CSS when those prefixes are necessary.

## Install Dependencies

```shell
yarn add --dev postcss postcss-loader autoprefixer 
```

## Configure Browser Support

Add a `browserslist` property to `package.json`:

```json
{
  "browserslist": [
    "defaults",
    "not dead",
    "not op_mini all"
  ]
}
```

This tells compatible tools which browsers the project intends to support.

## Configure PostCSS

Create `postcss.config.js`:

```javascript
module.exports = {
  plugins: {
    autoprefixer: {}
  }
}
```

## Integrate with Webpack

Add `postcss-loader` to the LESS and CSS loader chains.

For LESS:

```javascript
{
  test: /\.less$/i,
  use: [
    isProduction
      ? MiniCssExtractPlugin.loader
      : 'style-loader',
    'css-loader',
    'postcss-loader',
    'less-loader'
  ]
}
```

For CSS:

```javascript
{
  test: /\.css$/i,
  use: [
    isProduction
      ? MiniCssExtractPlugin.loader
      : 'style-loader',
    'css-loader',
    'postcss-loader'
  ]
}
```

**Loader order matters.** Webpack executes these loaders from right to left. LESS is compiled first, then PostCSS processes the resulting CSS, and finally `css-loader` processes CSS imports and related references.

## Migrating to CSSnano

If you're already using LESS with the Clean CSS plugin, you should decide which tool handles minification. Consider using CSSnano if you're already incorporating PostCSS into Webpack. This keeps your CSS processing in one pipeline.

[CSSnano](https://cssnano.github.io/cssnano/) is a modular CSS optimization tool built on PostCSS.
It reduces stylesheet file sizes by removing unnecessary whitespace, comments, duplicate declarations, and other redundant CSS.

Install CSSnano:

```shell
yarn add --dev cssnano
```

Update `postcss.config.js`:

```javascript
module.exports = {
  plugins: {
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {}
    })
  }
}
```

- `cssnano` optimizes the resulting CSS.
- CSSnano runs only when `NODE_ENV` is set to `production`.

You can then remove `less-plugin-clean-css` and your `--clean-css` build option to avoid maintaining two separate minification approaches.

## Notes

- Autoprefixer does not automatically add every possible prefix.
- Browser support is determined by the project's Browserslist configuration.
- PostCSS supports many other plugins beyond Autoprefixer.

## References

- [PostCSS Documentation](https://postcss.org/)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [Browserslist](https://browsersl.ist/)
- [postcss-loader Documentation](https://github.com/webpack/postcss-loader)
- [CSSnano Documentation](https://cssnano.github.io/cssnano/)
- [CSSnano GitHub Repository](https://github.com/cssnano/cssnano)
