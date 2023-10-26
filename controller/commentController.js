const Comment = require('../models/comment');
const Post = require('../models/post');

// Create Comment;

module.exports.createComment = async(req,res)=>{
    try{
        const comment = await Comment.create(req.body);
        if(!comment){
            return res.json({
                error:"no comment available"
            });
        }
        const post = await Post.findById(comment.post);
        await post.comments.push(comment._id);
        await post.save();
        return res.json(comment);
    }catch(err){
        return console.log("Error in Creating Comment",err);
    }
}

// delete Comment 

module.exports.deleteComment = async(req,res)=>{
    try{
        const {id,post,user} = req.query;
        const commentD = await Comment.findById(id);
        const postId = await Post.findById(post);
        const orgCmt = await postId.comments.filter((cmt)=>(cmt.toString()===commentD._id.toString()));
        const postOrg = await postId.comments.splice(orgCmt,1);
        await Comment.findByIdAndDelete(commentD._id);
        await postId.save();
        return res.json({
            message:"Comment Deleted Successfully"
        });

    }catch(err){
        return console.log("Error in deleting comment",err);
    }
}


// get all comments 

// module.exports.getAllComments = async(req,res)=>{
//     const 
//     try{
//         const comments = await Post.findById()
//     }catch(err){
//         return console.log("error in getting all comments",err);
//     }
// }