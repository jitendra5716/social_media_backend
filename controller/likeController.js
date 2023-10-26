const Like = require('../models/like');
const Post = require('../models/post');

// create like

module.exports.createLike = async(req,res)=>{
    try{
        let {user,post} = req.body;
        const prevUser = await Like.findOne({user,post});
        // console.log(prevUser);
        if(!prevUser){
            const likeOne = await Like.create({user,post});
            const postData = await Post.findById(likeOne.post);
            await postData.likes.push(likeOne._id);
            await postData.save();
            return res.json(likeOne);
        }else{
            // console.log(prevUser);
            const postData = await Post.findById(post);
            await  postData.likes.pop(prevUser._id);
            await postData.save();
            const likeTwo = await Like.deleteOne(prevUser);
            
            // await postData.likes.pop(likeTwo._id);
            // await postData.save();
            return res.json(likeTwo);
        }
        
    }catch(err){
        return console.log("Error in creating like ",err);
    }
}