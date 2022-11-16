import fs from 'fs'
import { describe, test } from '@jest/globals'

import HTTPRequest from './http-request.js'
import HTTPResponse from './http-response.js'


describe("HTTP Request", () => {
    test("Parse correct HTTP request", () => {
        const data = fs.readFileSync('examples/get.request.http', 'utf8')
        expect(new HTTPRequest(data))
    })

    test("Parse correct values", () => {
        const data = fs.readFileSync('examples/get.request.http', 'utf8')
        const request = new HTTPRequest(data)

        expect(request.method).toBe('GET')
        expect(request.url).toBe('/index.html?a=5&b=asd#footer')
        expect(request.protocolVersion).toBe('1.1')
        expect(request.headers['Host']).toBe('www.example.com')
        expect(request.headers['Connection']).toBe('Keep-Alive')
        expect(request.body).toBe('')
    })

    test("Calculates correct values", () => {
        const data = fs.readFileSync('examples/get.request.http', 'utf8')
        const request = new HTTPRequest(data)

        /// index.html?a=5&b=asd#footer
        expect(request.path).toBe('/index.html')
        expect(request.query['a']).toBe('5')
        expect(request.query['b']).toBe('asd')
        expect(request.fragment).toBe('footer')
    })
})
 