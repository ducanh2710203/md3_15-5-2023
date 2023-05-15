const http = require('http');
const server = http.createServer((req,res)=>{
    let txt = ""
    if (req.url === "/login"){
        console.log("login success")

    }else {
        console.log("login fail")
    }
    res.end(txt);
})
server.listen(8080,"localhost",()=>{
    console.log("server dang chay")
})