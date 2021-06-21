const mongoose= require('mongoose');
const uniqueValidator= require('mongoose-unique-validator');

const Schema= mongoose.Schema;

const blogschema = new Schema(
    {
        heading: {type:String , required: true},
        description: {type: String},
        userId : {type: Number, required: true, unique: true }
    }
)

blogschema.plugin(uniqueValidator);

module.exports= mongoose.model('blog',blogschema);