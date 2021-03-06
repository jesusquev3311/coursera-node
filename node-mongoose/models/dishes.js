//import the moongose pkg
const moongose = require('mongoose');

const Schema = moongose.Schema;

const commentSchema = new Schema({
    rating:{
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:{
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema]
}, {
    timestamps: true
});

let Dishes = moongose.model('dish', dishSchema);

module.exports = Dishes;