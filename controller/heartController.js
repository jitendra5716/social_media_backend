const Heart = require('../models/heart');
const Post = require('../models/post');

// create heart

// module.export.createHeart = async(req,res)=>{
//     try{
//         const {user,post} = req.body;

//         const heartAvl = await Heart.findOne({user,post});
//         if(!heartAvl){
//             const heart = await Heart.create({user,post});
//             const postData = await Post.findById(heart.post);
//             await postData.hearts.push(heart);
//             await postData.save();
//             return res.json(heart);
//         }else{
//             const postData = await Post.findById(post);
//             await postData.hearts.pop(heartAvl);
//             await postData.save();
//             const heartDelete = await Heart.deleteOne(heartAvl);
//             return res.json(heartDelete);
//         }

//     }catch(err){
//         return console.log("Error in creating heart",err);
//     }
// }

/// create heart

module.exports.createHeart = async(req,res)=>{
    try{
        const {user,post} = req.body;

        const heartAvl = await Heart.findOne({user,post});

        if(!heartAvl){
            const heart = await Heart.create({user,post});
            const postData = await Post.findById(heart.post);
            await postData.hearts.push(heart);
            await postData.save();
            return res.json(heart);
        }else{
            const postData = await Post.findById(post);
            await postData.hearts.pop(heartAvl);
            await postData.save();
            const heartDelete = await Heart.deleteOne(heartAvl);
            return res.json(heartDelete);
        }
    }catch(err){
        return console.log("error in creating heart",err);
    }
}