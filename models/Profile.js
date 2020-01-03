const mongoose=require('mongoose');
var Schema_Profile=mongoose.Schema;

const ProfileSchema=new Schema_Profile({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    company:{
        type: String
    },
    location:{
        type: String
    },
    status:{
        type:String,
        required: true
    },
    skills:{
        type: [String],
        required:true
    },
    bio:{
        type:String
    },
    githubusername:{
        type:String
    },

    experience:[
        {
            company:{
                type:String,
                required:true
            },
            title:{
                type:String,
                required:true
            },
            location:{
                type:String
            },
            from:{
                type:Date,
                required:true
            },
            to:{
                type:Date,
                required:false
            },
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String

            }
        }
    ],

    education:[
        {
            school:{
                type:String,
                required:true
            },
            degree:{
                type:String,
                required:true
            },
            fieldofstudy:{
                type:String,
                required:true
            },
            from:{
                type:Date,
                required:true
            },
            to:{
                type:Date,
                required:false
            },
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String

            }
        }
    ],
    social:{
        youtube:{
            type:String
        },
        facebook:{
            type:String
        },
        twitter:{
            type:String
        },
        linkedin:{
            type:String
        },
        instagram:{
            type:String
        },
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=Profile=mongoose.model('profile',ProfileSchema);