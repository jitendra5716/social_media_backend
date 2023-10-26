const bcrypt = require('bcryptjs');


module.exports.verifyEmail = (email)=>{
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email.match(emailFormat)) { return true; }
    
    return false;
};

module.exports.verifyImgUrl = (url)=>{
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

module.exports.hashPassword = (password)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.genSalt(12,(err,salt)=>{
            if(err){
                reject(err);
            }
            bcrypt.hash(password,salt,(err,hash)=>{
                if(err){
                    reject(err);
                }
                resolve(hash);
            })
        })
    })
}

module.exports.comparePassword = (password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword);
}