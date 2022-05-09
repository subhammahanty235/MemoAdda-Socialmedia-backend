const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users_mem'
    },
    title:String,
    message:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likecount:{
        type:Number,
        default:0,
    },
    createdAt:{
        type:Date,
        default:new Date(),
    }

})
const postMessage= mongoose.model('postMessage', postSchema)
module.exports=postMessage