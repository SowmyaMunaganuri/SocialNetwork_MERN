const mongoose = require('mongoose');
var Schema_User=mongoose.Schema;

const UserSchema = new Schema_User({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports=User=mongoose.model('user',UserSchema);