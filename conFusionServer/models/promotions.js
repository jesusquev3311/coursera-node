//import the moongose pkg
const moongose = require('mongoose');
const Schema = moongose.Schema;
//adding the currency type to mongoose 
require('mongoose-currency').loadType(moongose);
const currency = moongose.Types.Currency;

const promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image:{
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
    description: {
        type: String,
        required: true
    },
   
    feature:{
        type:Boolean,
        default: false
    }
    
}, {
    timestamps: true
});

let Promotions = moongose.model('promotion', promotionSchema);

module.exports = Promotions;