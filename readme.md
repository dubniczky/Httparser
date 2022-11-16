# Httparser

Simple HTTP request and response parser

## Usage

### Install the package

Use any of the following package managers

```bash
npm add httparser
yarn add httparser
pnpm add httparser
```

### Import 

Note: the package only supports ES3 imports for now

```js
import { HTTPRequest, HTTPResponse } from 'httparser'
```

### Parse a file

```js
import fs from 'fs'
import { HTTPRequest, HTTPResponse } from 'httparser'

const data = fs.readFileSync('example.http', 'utf8')
const request = new HTTPRequest(data)

console.log(request.method)
console.log(request.headers['Host'])
console.log(request.fragment)
```
