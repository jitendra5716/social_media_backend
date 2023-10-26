const express = require('express');
const router = express.Router();
const likeController = require('../controller/likeController');

router.post('/create',likeController.createLike);




module.exports = router;