const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');

router.post('/create',commentController.createComment);
router.delete('/delete',commentController.deleteComment);





module.exports = router;