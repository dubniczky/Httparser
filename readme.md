# Httparser

Simple HTTP request and response parser, written in pure javascript with zero dependencies

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

Request

```js
import fs from 'fs'
import { HTTPRequest } from 'httparser'

const data = fs.readFileSync('example.http', 'utf8')
const request = new HTTPRequest(data)

console.log(request.method)
console.log(request.headers['Host'])
console.log(request.fragment)

console.dir(request)
```

Response

```js
import fs from 'fs'
import { HTTPResponse } from 'httparser'

const data = fs.readFileSync('example.http', 'utf8')
const response = new HTTPResponse(data)

console.log(response.reason)
console.log(response.statusCode)
console.log(response.body)

console.dir(response)
```