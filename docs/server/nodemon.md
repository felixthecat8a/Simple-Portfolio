# Nodemon

[![Nodemon]( https://img.shields.io/badge/Nodemon-333?style=for-the-badge&logo=nodemon&logoSize=auto&logoColor=#76D04B)](https://nodemon.io/)

## Overview

[Nodemon](https://nodemon.io/) is a development utility that automatically restarts a Node.js application when it detects changes to watched files.

## Installation

Install Nodemon as a development dependency:

```bash
yarn add --dev nodemon
```

### `nodemon.json`

Create `nodemon.json` in the project root:

```json
{
  "restartable": "rs",
  "verbose": true,
  "watch": ["server.js", "src/", "config/"],
  "ignore": ["node_modules/", "coverage/", "test/", "dist/"],
  "ext": "js,json,yaml,yml,less",
  "exec": "node server.js",
  "env": {
    "NODE_ENV": "development",
    "PORT": "3000"
  }
}
```

**Configuration options:**

| Option | Description |
|---|---|
| `restartable` | Specifies the keyboard command used to restart the application manually. |
| `verbose` | Displays additional information about Nodemon's activity. |
| `watch` | Specifies files and directories to monitor. |
| `ignore` | Specifies files and directories to exclude from monitoring. |
| `ext` | Specifies file extensions that trigger a restart. |
| `exec` | Specifies the command used to launch the application. |
| `env` | Defines environment variables for the application. |

### Run with Nodemon

Add a development script to `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon"
  }
}
```

Run the development server:

```bash
yarn dev
```

Nodemon automatically discovers `nodemon.json` in the project directory.

### Using `--config` (Optional)

Use `--config` to specify a configuration file in another location.

For example, if the configuration is stored in `config/nodemon.json`:

```json
{
  "scripts": {
    "dev": "nodemon --config config/nodemon.json"
  }
}
```

This is useful when maintaining separate configurations for different environments or organizing configuration files into a dedicated directory.

For a simple project, keeping `nodemon.json` in the root directory is usually sufficient.
