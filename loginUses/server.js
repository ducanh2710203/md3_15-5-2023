const http = require('http');
const fs = require('fs');
const qs = require('qs')

const server = http.createServer(function (req,res) {
    if (req.method === 'GET') {
        fs.readFile('./index.html','utf8', function (err,data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    } else {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        })
        req.on('end', () => {
            const userInfo = qs.parse(data);
            fs.readFile('./info.html', 'utf8', function (err,data) {
                if (err) {
                    console.log(err);
                }
                data = data.replace('{name}', userInfo.name);
                data = data.replace('{email}', userInfo.email);
                data = data.replace('{password}', userInfo.password);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            });
        })
        req.on('error', () => {
            console.log('error')
        })
    }
});

server.listen(8080,'localhost' ,function () {
    console.log('server running at localhost:8080 ')
});

