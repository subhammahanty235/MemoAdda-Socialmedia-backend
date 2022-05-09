require('dotenv').config()
const express = require('express')
const User = require('../modals/usermodal')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fetchUser = require('../middleware/fetchUser')
//user : create a new account 
const signUp = async (req, res) => {
    let success = false;
    try {
        let user = await User.findOne({ emailid: req.body.emailid })
        if (user) {
            // message : "Sorry a user with this email already exists , please try again using another email"
            success = false;
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
            // return res.json(emailmessage)
        }
        //create a new user
        const salt = await bcrypt.genSalt(10);
        secpass = await bcrypt.hash(req.body.password, salt);
        //create a new user
        user = await User.create({
            name: req.body.name,
            emailid: req.body.emailid,
            profilepic: req.body.profilepic,
            password: secpass,

        })


        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SEC);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message)
        message = "Internal Server error , please try again later"
        res.status(500).send("error")
    }



}

const logIn = async (req, res) => {
    let success = false;
    
    
    const { emailid, password } = req.body;
    try {
        let user = await User.findOne({ emailid })
        if (!user) {
            success = false;
            return res.status(404).json({ error: "Please try to log in with correct credentials" });
        }
        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            success = false;
            return res.status(404).json({ error: "Please try to log in with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SEC);
        success = true;

        res.json({ success, authtoken, })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("internal server error")
    }
}
const getUser = async (req,res)=>{
    try {
       
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
      } catch (error) {
        console.error(error.message)
        res.status(500).send("internal server erraaaaor")
      }
    
}
module.exports = {signUp , logIn ,getUser}