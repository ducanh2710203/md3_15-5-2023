const http = require("http")
const fs = require("fs")
const qs = require("qs")
const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        fs.readFile('./calculator.html', 'utf-8', (err, data) => {
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(data);
            return res.end()

        })
    } else {
        let data = ""
        req.on('data', (chunk) => {
            data += chunk
        })
        req.on('end', () => {

            const userInfo = qs.parse(data)
            fs.readFile('./result.html', 'utf-8', (err, data) => {
                if (err) {
                    console.log(err)
                }
                let result = 0
                if (userInfo.calculation === '+') {
                    result = parseInt(userInfo.num1) + parseInt(userInfo.num2)
                    data = data.replace('{result}', result)
                } else if (userInfo.calculation === '-') {
                    result = userInfo.num1 - userInfo.num2

                    data = data.replace('{result}', result)
                } else if (userInfo.calculation === '*') {
                    result = userInfo.num1 * userInfo.num2

                    data = data.replace('{result}', result)
                } else if (userInfo.calculation === '/') {
                    result = userInfo.num1 / userInfo.num2

                    data = data.replace('{result}', result)
                } else {
                    data = data.replace('{result}', "ko ra ket qua")

                }
                res.writeHead(200, {'Content-type': 'text/html'});
                res.write(data);
                return res.end()
            })
        })
        req.on('error', () => {
            console.log('error')
        })
    }
})
server.listen(3300, 'localhost', () => {
    console.log('server running at localhost:3300 ')
})