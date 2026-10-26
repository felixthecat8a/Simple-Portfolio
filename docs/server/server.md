# Node.js Server

[![Node.js](https://img.shields.io/badge/powered_by-Node.js-5fa04e?style=for-the-badge&logo=nodedotjs&logoColor=5fa04e)](https://nodejs.org/)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

**Node.js&reg;** is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web applications, command-line tools, and scripts.

## Run the Server

Add the following scripts to `package.json`.

### `package.json`

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  }
}
```

- `yarn start` runs the server normally.
- `yarn dev` runs the server with Node.js watch mode, which restarts it when relevant files change.

Node.js includes built-in watch mode, so Nodemon is optional.
