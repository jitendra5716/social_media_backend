const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const jwtAuth = require("../helper/jwtMiddleware");


router.post('/register',userController.createUser);
router.post('/login',userController.loginUser);
router.get('/profile',jwtAuth.jwtAuth,userController.getProfile);
router.get('/logout',userController.signOut);
router.get('/getAll',userController.getAll);
router.get('/friend/:id',userController.friendProfile);
router.post('/profileData',userController.findUser);
router.put('/update/:id',userController.updateDetails);
router.delete('/delete/:id',userController.deleteUser);




module.exports = router;