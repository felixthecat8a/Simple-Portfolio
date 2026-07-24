<!-- Node.js Server -->
# Node.js Server
[![NodeJS]( https://img.shields.io/badge/powered_by-Node.js-5fa04e?style=for-the-badge&logo=nodedotjs&logoSize=auto&logoColor=5fa04e)](https://nodejs.org)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoSize=auto&logoColor=F7DF1E)
[![Nodemon]( https://img.shields.io/badge/Nodemon-333?style=for-the-badge&logo=nodemon&logoSize=auto&logoColor=#76D04B)](https://nodemon.io/)
[![YAML]( https://img.shields.io/badge/yaml-CB171E?style=for-the-badge&logo=yaml&logoSize=auto)](https://yaml.org/)

***Node.js®*** is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.

- In the terminal, run `yarn start` to run the project server.
<!-- package.json -->
### `package.json`
```json
{
  "scripts": {
    "start": "node index.js",
  }
}
```

<!-- Dependencies -->
## Dependencies

### YAML

[***YAML***](https://yaml.org/) is a human-friendly data serialization format commonly used for configuration files.
Using YAML helps keep configuration separate from code and avoids hard-coding values directly into JavaScript files.

- Install the *yaml* package.

```ps
yarn add yaml
```

### Nodemon

[***Nodemon***](https://nodemon.io/) is a command-line tool that automatically restarts the node application when it detects changes to files in the project directory.

- Install *Nodemon* as a development dependency.
- Create a `nodemon.json` file to configure.

```ps
yarn add --dev nodemon
```

### `nodemon.json`

```json
{
  "restartable": "rs",
  "verbose": true,
  "exec": "node index.js",
  "watch": ["server/", "src/"],
  "ignore": ["node_modules", "coverage", "test", "dist"],
  "ext": "js,less",
  "events": {
    "restart": "yarn build"
  },
  "env": {
    "NODE_ENV": "development",
    "PORT": "3000"
  }
}
```

- Run `yarn dev` to run and monitor the server using Nodemon.
<!-- package.json -->
### `package.json`

```json
{
  "scripts": {
    "dev": "nodemon --config server/config/nodemon.json",
  }
}
```
---
