export default class HTTPRequest {
    protocolVersion // Version of the http protocol specified in the first line
    reason
    statusCode
    body
    headers

    constructor(dataString) {
        if (!dataString) {
            throw new Error('Http data cannot be null')
        }

        // Parse data
        const lines = dataString.split('\r\n')

        // First line
        const statusLine = lines.shift()
        const [protocolVersion, statusCode, ...reason] = statusLine.split(' ')
        this.protocolVersion = protocolVersion.split('/')[1]
        this.statusCode = parseInt(statusCode)
        this.reason = reason.join(' ')

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
    }

    toString() {
        let result = `HTTP/${this.protocolVersion} ${this.statusCode} ${this.reason}\r\n`
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