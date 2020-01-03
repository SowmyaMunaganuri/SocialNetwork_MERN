const mongoose=require('mongoose');
var Schema_Post=mongoose.Schema;

const PostSchema=new Schema_Post({
    user:{
        type: Schema_Post.Types.ObjectId,
        ref:'users'
    },
    text:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    avatar:{
        type:String
    },
    likes:[
        {
            user:{
                type:Schema_Post.Types.ObjectId,
                ref:'users'
            }
        }
    ],
    comments:[
        {
        user:{
            type:Schema_Post.Types.ObjectId,
            ref:'users'
            },
            text:{
                type:String,
                required:true
            },
            name:{
                type:String
            },
            avatar:{
                type:String
            },
            date:
            {
                type:Date,
                default:Date.now
            }

        }
    ],
    date:{
        type:Date,
        default:Date.now
    }

});

module.exports=Post=mongoose.model('post',PostSchema);