export default class HTTPRequest {
    protocolVersion // Version of the http protocol specified in the first line
    method
    url
    body
    headers

    constructor(data) {
        if (!data) {
            throw new Error('Http data cannot be null')
        }

        // Parse data
        const lines = data.split('\r\n')
        console.log(lines.length)

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
    }
}
