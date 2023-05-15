const http = require('http');
const fs = require('fs');
const qs = require('qs')
let arr = []
let strName = ''
let strWork = ''
const server = http.createServer(function (req,res) {
    if (req.method === 'GET') {
        fs.readFile('./todo.html','utf8', function (err,data) {
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
            arr.push(userInfo)
            console.log(arr)
            fs.readFile('./display.html', 'utf8', function (err,data) {
                if (err) {
                    console.log(err);
                }
                    data = data.replace('{full}',strName+= userInfo.name+":"+userInfo.work+"<br>");
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                 res.end();
            });
        })
        req.on('error', () => {
            console.log('error')
        })
    }
});

server.listen(3030, function () {
    console.log('server running at localhost:3030 ')
});

