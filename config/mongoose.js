const mongoose = require('mongoose');

let mongo_url = process.env.MONGO_URL;
// console.log(mongo_url);

const mongoConnect = mongoose.connect(mongo_url).then(()=>{
    console.log("Database successfully connected");
}).catch((err)=>{
    console.log("Database not connected");
});

module.exports = mongoConnect;