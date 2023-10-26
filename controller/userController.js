const User = require('../models/user');
const {verifyEmail, hashPassword, comparePassword,verifyImgUrl} = require('../helper/verify');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

module.exports.createUser = async(req,res)=>{
    try{
        const {name,email,image,password,confirm_password} = req.body;

        if(!name || name.length<3){
            return res.json({
                error:"Name  must be required and not less than 3 characters"
            })
        }


        const findEmail = await User.findOne({email});
        if(findEmail){
            return res.json({
                error:"Email is already exist  try login to continue"
            })
        }
        const validEmail = verifyEmail(email);
        if(validEmail==false){
            return res.json({
                error:"Enter valid email address"
            })
        }
        const valid_imageUrl = verifyImgUrl(image);
        // if(valid_imageUrl==false){
        //     return res.json({
        //         error:"Invalid image url"
        //     })
        // }

        if(!password ||password.length<6){
            return res.json({
                error:"Password must be required and do not less than 6 character"
            })
        }
        
        if( password != confirm_password){
            return res.json({error:"password and confirm password does not matched"});
        }
        let  hashedPassword = await hashPassword(password);
        // console.log(hashedPassword);
        
        const user = await User.create({name,email,image,password:hashedPassword});

        return res.status(201).json(user);

    }catch(err){
        return console.log("Error in creating user",err);
    }
};

// Login user

module.exports.loginUser = async(req,res)=>{
    try{
        // res.cookie('userToken', 'your_token_value', { httpOnly: true });
        // res.cookie('user','hitendera');
        const {email,password}= req.body;

        const user = await User.findOne({email});
        // console.log(user);
        if(!user){
            return res.json({
                error:"Invalid Username/Password"
            })
        }
        if(!password || password.length<6 ){
            return res.json({error:"Password  must be required and length should be more than 6 characters"});
        }
        
        const matchPassword = await comparePassword(password,user.password);
        if(!matchPassword){
            return res.send({error:"Invalid Username/Password"});
        }
        const token = jwt.sign({email:user.email,id:user._id,name:user.name,image:user.image},"SDIPGAPOUDUPIUNNA04356",{ expiresIn: '1d' },(err,token)=>{
            if(err){
                return console.log(err);
            }else{
                // const newTk = JSON.stringify(token)
                // httpOnly: true, maxAge: 24 * 60 * 60 * 1000
                req.user = user;
            res.cookie('token',token);
            return res.send({"token":token});
            
            }
            
        });

    }catch(err){
        return console.log("Error in logging the user",err);
    }
}

// get Profile

module.exports.getProfile = async(req,res)=>{
    try{
        const token = req.headers['authorization'];
        if(token){
            const payload =await jwt.verify(token,process.env.JWT_SECRET,{});
            // console.log(payload);
            const {userEmail} =payload;
            const userSelf = await User.findOne({userEmail}).populate({path:'posts',select:"content imgUrl createdAt",populate:{path:"user",select:"name image"}}).populate({path:'posts',select:"content imgUrl",populate:{
                path:'comments',select:'content',populate:{
                    path:'user',select:"name image"
                }
            }}).populate({path:'posts',select:"content imgUrl",populate:{
                path:'likes',select:"user"
            }}).populate({path:'posts',select:"content imgUrl",populate:{
                path:'hearts',select:"user"
            }})
            // console.log(userSelf);
            req.user = payload;
            
            // console.log(payload);
            return res.json(payload);
        }else{
            res.json({error:"token not found"});
        }
        
    }catch(err){
        return console.log("Error in getProfile of user",err);  
    }
}

//signout

module.exports.signOut = (req,res)=>{
    // console.log("abcdsgdagobo");
    res.clearCookie("token");
    return res.json({
        message:"Logout success"
    })
}


// Get All Users

module.exports.getAll = async(req,res)=>{
    try{
        const users = await User.find({}).select('-password');
        if(!users){
            return res.json({
                error:"User Not Found"
            })
        }
        return res.json(users);
    }catch(err){
        return console.log("Error in getting all users",err);
    }
}

// get friend profile

module.exports.friendProfile = async(req,res)=>{
    try{
        const {id} = req.params;
        const friend = await User.findById(id);
        if(!friend){
            return res.json({error:"Error in getting friend"})
        }
        return res.json(friend);
    }catch(err){
        return console.log("Error in finding friend profile",err);
    }
}

// get user profile data

module.exports.findUser = async(req,res)=>{
    try{
        const {id} = req.body;
        // console.log(id);
        const userData = await User.findById(id).populate({path:'posts',select:'content imgUrl createdAt',populate:{path:"user",select:"name image"}}).populate({path:'posts',select:"content imgUrl",populate:{
            path:'comments',select:'content',populate:{
                path:'user',select:"name image"
            }
        }}).populate({path:'posts',select:"content imgUrl",populate:{
            path:'likes',select:"user"
        }}).populate({path:'posts',select:"content imgUrl",populate:{
            path:'hearts',select:"user"
        }});
        if(!userData){
            return res.json({
                error:"Error in getting userData"
            })
        }
        return res.json(userData);
    }catch(err){
        return console.log("Error in getting user data",err);
    }
}

// update User

module.exports.updateDetails = async(req,res)=>{
    try{
        const {id} = req.params;
        const {name,image} = req.body;
        // console.log(image);
        const user = await User.findByIdAndUpdate(id,{name:name,image:image});
        if(!user){
            return res.json({
                error:"user not found"
            })
        }
        return res.json({message:"Data Updated Successfully!"});
        

    }catch(err){
        return console.log("Error in updating user details ",err);
    }
}

// delete user

module.exports.deleteUser = async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        return res.json({
            message:"User Deleted Successfully",
        });
        
    }catch(err){
        return console.log("Error in deleting user profile",err);
    }
}


// module.exports.getProfile = async(req,res)=>{
//     try{
//         const {token} = await req.cookies;
//         console.log(token);
//         return res.send(token);
        // console.log(req.cookies);
        // if(token){
        //     await jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
        //         if(err){
        //             res.send({
        //                 error:"something went wrong"
        //             })
        //         }
        //         return res.json(user);
        //     })
        // }
//     }catch(err){
//         return console.log("Error in getProfile of user",err);  
//     }
// }

