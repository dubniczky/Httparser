import fs from 'fs'
import HTTPRequest from './http-request.js'
import HTTPResponse from './http-response.js'

const data = fs.readFileSync('examples/get.request.http', 'utf8')
console.dir(new HTTPRequest(data), { depth: null })

const data2 = fs.readFileSync('examples/get.response.http', 'utf8')
console.dir(new HTTPResponse(data2), { depth: null })