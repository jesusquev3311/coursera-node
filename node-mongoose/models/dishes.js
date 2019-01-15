//import the moongose pkg
const moongose = require('mongoose');

const Schema = moongose.Schema;

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
}, {
    timestamps: true
});

let Dishes = moongose.model('dish', dishSchema);

module.exports = Dishes;