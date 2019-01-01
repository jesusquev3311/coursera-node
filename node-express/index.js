const express = require('express');
const app = new express();
const port = process.env.port || 3000;
const http = require('http');

app.use((req,res,next) =>{
    console.log(req.headers);

    res.statusCode = 200;
    res.setHeader('content-type', 'text/html');
    res.end('<html><body><h1>This is a Express JS server</h1></body></html>');

});
const server = http.createServer(app);

server.listen(port,() =>{
    console.log(`Listening to Port: ${port}`);
});