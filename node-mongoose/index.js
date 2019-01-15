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

       return Dishes.findByIdAndUpdate(dish._id,{
           $set:{description: "Updated Description"}
       }, {new: true}).exec();
    })
    .then((dish) =>{
        console.log(dish);
        dish.comments.push({
            rating: 5,
            comment: "This is a comment",
            author: 'Armando Banquito'
        });

        return dish.save();
    })
    .then((dish) =>{
        console.log(dish);
          
        return Dishes.remove({});
    })
    .then(() =>{
        return mongoose.connection.close();
    })
    .catch(err => console.log(err));
});