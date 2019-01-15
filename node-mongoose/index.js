//require mongoose ODM
const mongoose = require('mongoose');
//import Dishes model
const Dishes  = require('./models/dishes');
// Database URL
const url = 'mongodb://localhost:27017/conFusion';
//stablishing connection to DB
const connect = mongoose.connect(url);

connect.then((db) =>{
    console.log(`connected correctly : ${db}`);

     Dishes.create({
        name : 'Utahpizza',
        description: 'Test Pizza'
    })

    .then((dish) =>{
        console.log(dish);

       return Dishes.find({}).exec();
    })
    .then((dishes) =>{
        console.log(dishes);
    })
    .then(() =>{
        return Dishes.remove({});
    })
    .then(() =>{
        return mongoose.connection.close();
    })
    .catch(err => console.log(err));
});