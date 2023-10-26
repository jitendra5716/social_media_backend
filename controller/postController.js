const Post = require('../models/post');
const User = require('../models/user');

// Create Post

module.exports.createPost = async(req,res)=>{
    try{
        // const {content,imgUrl,user} = req.body;
        // console.log(req.body);
        const post = await Post.create(req.body);
        if(!post){
            return res.send({
                error:"Error in creating users"
            })
        }
        const user = await User.findById(post.user);
        await user.posts.push(post._id);
        await user.save();
        return res.send(post);
    }catch(err){
        return console.log("Error in creating post",err);
    }
}

// get all posts

module.exports.getAll = async(req,res)=>{
    try{
        const users = await Post.find({}).populate("user","name email image").populate({path:'comments', model:"Comment", select:'content',populate:{
            path:'user',
            select:"image name"
        }}).populate({path:'comments', model:"Comment", select:'content',populate:{
            path:'post',
            select:"id content"
        }}).populate({
            path:'hearts',
            populate:{
                path:'user',
                select:'name'
            }
        });
        if(!users){
            return res.json({
                error:"users not found"
            })
        }
        return res.json(users);
    }catch(err){
        return console.log("Error in getting all posts",err);
    }
}

// delete Post

module.exports.deletePost = async(req,res)=>{
    try{
        const {id,user} = req.query;
        const postId = await Post.findById(id);
        const userId = await User.findById(user);
        const userPost = userId.posts.filter((usr)=>(usr.toString()===postId._id.toString()));
        await userId.posts.splice(userPost,1);
        await userId.save();
        await Post.deleteOne(postId);
        return res.json({
            message:"Post Deleted Successfully!"
        });
    }catch(err){    
        return console.log("Error in deleting a post",err);
    }
}