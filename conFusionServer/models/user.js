mongoose = require('mongoose');
Schema = mongoose.Schema;
UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    admin:{
        type: Boolean,
        default: false
    }
});

module.exports =  mongoose.model('user', UserSchema);