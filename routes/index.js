const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    // res.cookie("hello","user");
    return res.send("<h1>Home page </h1>");
})
router.use('/user',require('./userRoutes'));
router.use('/post',require('./postRoutes'));
router.use('/comment',require('./commentRoutes'));
router.use('/like',require('./likeRoutes'));
router.use('/heart',require('./heartRoutes'));

module.exports = router;

