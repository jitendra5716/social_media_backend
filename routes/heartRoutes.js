const express = require('express');
const router = express.Router();
const heartController = require('../controller/heartController');

router.post('/create',heartController.createHeart);


module.exports = router;