import fs from 'fs'
import { describe, test } from '@jest/globals'

import HTTPRequest from './http-request.js'
import HTTPResponse from './http-response.js'


describe("HTTP Request", () => {
    test("Parse HTTP Request", () => {
        const data = fs.readFileSync('examples/get.request.http', 'utf8')
        const request = new HTTPRequest(data)
        expect(request.method).toBe('GET')
        expect(request.url).toBe('/index.html')
    })
})
