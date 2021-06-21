const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({




        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        email: {type: String, required: true, index:{unique: true} },
        password: {type: String, required: true , minlength: 8},
        dob: {type: Date, required: true},
        role: {type: String, required: true},
    
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);