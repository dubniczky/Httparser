export default class HTTPRequest {
    protocolVersion // Version of the http protocol specified in the first line
    method
    url
    body
    headers

    path
    query
    fragment

    constructor(data) {
        if (!data) {
            throw new Error('Http data cannot be null')
        }

        // Parse data
        const lines = data.split('\r\n')

        // First line
        const firstLine = lines.shift()
        const [method, url, protocolVersion] = firstLine.split(' ')
        this.method = method
        this.url = url
        this.protocolVersion = protocolVersion.split('/')[1]

        // Headers
        this.headers = {}
        while (true) {
            const currentLine = lines.shift()
            if (currentLine == '') {
                break
            }
            const [key, value] = currentLine.split(': ')
            this.headers[key] = value
        }

        // Body
        if (lines.length > 0) {
            this.body = lines.join('\r\n')
        }
        else {
            this.body = null
        }

        // Parse url parts
        this._parseURL(this.url)
    }

    _parseURL(url) {
        // Path
        let [path, remaining] = url.split('?')
        this.path = path

        let [query, fragment] = remaining.split('#')
        this.fragment = fragment
        
        // Query
        this.query = {}
        query = query.split('&')
        for (const param of query) {
            const [key, value] = param.split('=')
            this.query[key] = value
        }
    }

    toString() {
        let result = `${this.method} ${this.url} HTTP/${this.protocolVersion}\r\n`
        for (const key in this.headers) {
            result += `${key}: ${this.headers[key]}\r\n`
        }
        result += '\r\n'
        if (this.body) {
            result += this.body
        }
        return result
    }
}
