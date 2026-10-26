# YAML

[![YAML](https://img.shields.io/badge/YAML-CB171E?style=for-the-badge&logo=yaml&logoColor=white)](https://yaml.org/)


[YAML](https://yaml.org/) is a human-friendly data serialization format commonly used for configuration files.

Install the `yaml` package:

```bash
yarn add yaml
```

Using YAML allows you to keep configuration separate from application code.

`server.yaml`

```js
server:
  host: localhost
  port: 3000
```

`server.js`

```javascript
import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';

const text = await readFile('config/server.yaml', 'utf8');
const config = parse(text);

console.log(config.server.port);
```
