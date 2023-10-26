const mongoose = require('mongoose');


const heartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }
},{
    timestamps:true
});

const Heart = mongoose.model('Heart',heartSchema);

module.exports = Heart;