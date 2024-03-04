const express=require('express');
const { model } = require('mongoose');
const { test ,updateUser,deleteUser,getUserListing} = require('../controllers/user.controller');
const verifyToken = require('../utils/verifyUser');

const router=express.Router();

router.get('/test',test)
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/listings/:id',verifyToken,getUserListing)
module.exports=router