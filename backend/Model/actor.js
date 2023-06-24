const mongoose = require('mongoose');
const actorSchema = new mongoose.Schema({
     name: {
            type: String,
            trim:true,
            required: true
     },
    about:{
        type: String,
        trim:true,
        required: true
    },
    gender:{
        type: String,
        trim:true,
        required: true
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    avatar:{
        type:Object,
        url:String,
        public_id:String
    }}
    ,{
        timestamps: true
    }


);


module.exports = mongoose.model('Actor', actorSchema);