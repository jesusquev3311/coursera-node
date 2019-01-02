const express = require('express');
const app = new express();
const port = process.env.port || 3000;
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);



app.use((req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('content-type', 'text/html');
    res.end('<html><body><h1>This is a Express JS server</h1></body></html>');

});
const server = http.createServer(app);

server.listen(port,() =>{
    console.log(`Listening to Port: ${port}`);
});