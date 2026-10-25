# PostCSS and Autoprefixer

![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white)

## Overview

[PostCSS](https://postcss.org/) transforms CSS using JavaScript plugins.

[Autoprefixer](https://github.com/postcss/autoprefixer) is a PostCSS plugin that adds vendor prefixes to CSS declarations when required by the configured browser support targets.

For example, Autoprefixer can generate browser-specific declarations from standard CSS when those prefixes are necessary.

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
  plugins: [
    require('autoprefixer')
  ]
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

## Notes

- Autoprefixer does not automatically add every possible prefix.
- Browser support is determined by the project's Browserslist configuration.
- PostCSS supports many other plugins beyond Autoprefixer.

## References

- [PostCSS Documentation](https://postcss.org/)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [Browserslist](https://browsersl.ist/)
