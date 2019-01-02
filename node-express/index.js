const express = require('express');
const app = new express();
const port = process.env.port || 3000;
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use('/dishes', dishRouter);

/* Assignment 1
//Single Items 
//GET request
app.get('/dishes/dishId', (req,res,next)=>{
    res.end('Will send details of dish: ' + req.params.dishId );
});

//POST Method
app.post('/dishes/dishId', (req, res, next) =>{
    res.statusCode(403);
    res.end('POST is not supportted on Dish: ' + req.params.dishId);
});

//PUT Method
app.put('/dishes/dishId', (req, res, next) =>{
    res.write('Will update the Dish: ' + req.params.dishId)
    res.end('will update the Dish: ' + req.body.name +
    'Will update the descripton: ' + req.body.description);
});

//DELETE Method
app.delete('/dishes/dishId', (req, res, next) =>{
    res.end('This will Delete the dish: ' + req.params.dishId);
});*/

app.use((req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('content-type', 'text/html');
    res.end('<html><body><h1>This is a Express JS server</h1></body></html>');

});
const server = http.createServer(app);

server.listen(port,() =>{
    console.log(`Listening to Port: ${port}`);
});