//import the moongose pkg
const moongose = require('mongoose');
const Schema = moongose.Schema;
//adding the currency type to mongoose 
require('mongoose-currency').loadType(moongose);
const currency = moongose.Types.Currency;

const leadersSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true
    },
    abbr:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featured:{
        type:Boolean,
        default: false
    }
    
}, {
    timestamps: true
});

let Leaders = moongose.model('leader', promotionSchema);

module.exports = Leaders;