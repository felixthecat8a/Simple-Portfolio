# Code Coverage

Code coverage measures how much of your source code is exercised by your tests.

## Install

```bash
yarn add --dev c8
```

## Configure c8

### `.nycrc.json`

Create `.nycrc.json` in your project root:

```json
{
  "reporter": ["text", "html"],
  "all": true,
  "include": ["src/**/*.js"],
  "exclude": ["test/**"],
  "check-coverage": true,
  "lines": 80,
  "functions": 80,
  "branches": 70,
  "statements": 80
}
```

| Option | Description |
|---|---|
| `reporter` | Specifies the coverage report formats. |
| `all` | Includes eligible source files even if they weren't imported during testing. |
| `include` | Limits coverage to the specified source files. |
| `exclude` | Excludes matching files from coverage. |
| `check-coverage` | Enforces the configured coverage thresholds. |
| `lines` | Minimum line coverage percentage. |
| `functions` | Minimum function coverage percentage. |
| `branches` | Minimum branch coverage percentage. |
| `statements` | Minimum statement coverage percentage. |

**Note:** c8 supports `.nycrc.json` for its configuration, along with `.c8rc.json` and other supported formats. Confirm the filename and option support against the c8 version used by your project.

### Using `--config` (Optional)

You can explicitly select a configuration file instead of relying on automatic discovery:

```bash
yarn c8 --config .nycrc.json mocha
```

This is useful when you maintain multiple configurations or store them outside the project root.

For a simple project, automatic discovery is usually sufficient.

## Run Coverage

Add a script to `package.json`:

```json
{
  "scripts": {
    "test": "mocha",
    "test:coverage": "c8 mocha"
  }
}
```

Run:

```bash
yarn test:coverage
```

The text report appears in the terminal, and the HTML report is generated in the coverage output directory, typically `coverage/`.

```
start coverage/index.html
```

Note: The start command works on Windows. For macOS/Linux, use open coverage/index.html.

## Coverage Metrics

- **Statements:** How many statements ran.
- **Branches:** How many conditional paths ran.
- **Functions:** How many functions were called.
- **Lines:** How many lines ran.

High coverage doesn't guarantee that tests catch every bug. Focus on testing meaningful behavior as well as meeting coverage targets.
