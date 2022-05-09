const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    emailid:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilepic:{
        type:String,
        // default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDIU19adaWvDMAl3QpetxRc58LpzDMpFG7PQ&usqp=CAU"
    },
    joined:{
        type:Date,
        default:Date.now(),
    }

})
const User = mongoose.model('users_mem' , userSchema)
module.exports = User ;