const express = require('express');

const router = express.Router();
const postController = require('../controller/postController');

router.post('/create',postController.createPost);
router.get('/getAll',postController.getAll);
router.delete('/delete',postController.deletePost);




module.exports = router;