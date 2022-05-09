const express = require('express');
const fetchUser = require('../middleware/fetchUser')
const router = express.Router();
const {signUp , logIn,getUser} = require('../controllers/authentication')


router.post('/api/signUp' , signUp);
router.post('/api/login' , logIn);
router.get('/api/getdetails' ,fetchUser ,getUser )


module.exports = router