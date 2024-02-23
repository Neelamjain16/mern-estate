const express=require('express');
const { model } = require('mongoose');
const { test } = require('../controllers/user.controller');

const router=express.Router();

router.get('/test',test)

module.exports=router