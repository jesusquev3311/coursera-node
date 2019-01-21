//import the moongose pkg
const moongose = require('mongoose');
const Schema = moongose.Schema;
//adding the currency type to mongoose 
require('mongoose-currency').loadType(moongose);
const currency = moongose.Types.Currency;

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
    }, author:{
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
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price:{
        type: currency,
        required: true
    },
    feature:{
        type:Boolean,
        default: false
    },
    comments: [commentSchema],
    
}, {
    timestamps: true
});

let Dishes = moongose.model('dish', dishSchema);

module.exports = Dishes;