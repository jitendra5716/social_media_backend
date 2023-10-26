
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    imgUrl:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ],
    hearts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Heart'
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
},{
    timestamps:{ currentTime: ()=> Date.now() }
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;