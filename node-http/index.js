const http = require('http');
const fs   = require('fs');
const path = require('path');
const port =  3000;

const server = http.createServer((req,res) =>{
    console.log(`Request for ${req.url} by method ${req.method}`);

    if(req.method === 'GET'){
        let fileURL;
        req.url === '/'? fileURL = 'index.html' : fileURL = req.url;
        
        let filePath = path.resolve('./public/' + fileURL);
        console.log(filePath)
        const fileExt = path.extname(filePath);

        if(fileExt == '.html'){
            
            fs.exists(filePath, (exist) =>{
                if(!exist){
                    res.statusCode = 404;
                    res.setHeader('content-tytpe', 'text/html');
                    res.end(`<html><h1>Error 404: ${fileURL} not found !!!</h1></html>`);
                    return
                }
                res.statusCode = 200;
                res.setHeader('content-tytpe', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            })
        } else {
            res.statusCode = 404;
            res.setHeader('content-tytpe', 'text/html');
            res.end(`<html><h1>Error 404: ${fileURL} is not a HTML file !!!</h1></html>`);
            return
        }
    } else {
        res.statusCode = 404;
        res.setHeader('content-tytpe', 'text/html');
        res.end(`<html><h1>Error 404: ${req.method} is not GET method !!!</h1></html>`);
        return
    }
});

server.listen(port, (req, res) => {
   console.log(`Listening to port: ${port}`);
});



