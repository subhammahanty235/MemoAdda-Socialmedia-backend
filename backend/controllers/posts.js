const postMessage = require('../modals/postMessage')
const mongoose = require('mongoose')

const getPosts =async (req,res)=>{
    if(!req.params.id){
        try {
            const postmessages = await postMessage.find();
            // console.log(postmessages)
            res.status(200).json(postmessages)
    
        } catch (error) {
            res.status(400).json({message:error.message})
        }

    }
    else{ 
        try {
            const id = req.params.id;
            const post = await postMessage.findById(id);
            res.status(200).json(post)
        } catch (error) {
            res.status(404).json({message:error.message})
        }
    }
}
const fetchPosts = async(req,res)=>{
    const resp = await postMessage.find();
    res.json(resp);
}
const createPost = async(req,res)=>{
    const {creator ,title ,message,tags ,selectedFile} = req.body;
    const newPost = new postMessage({
        creator , title,message ,tags ,selectedFile ,user:req.user.id
    })
    try {
        await newPost.save();
        res.status(201).json(newPost)
        console.log("successfully created")
    } catch (error) {
        console.log("error")
        res.status(404).json({message:error.message})
    }
}
const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await postMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}
const likePost = async(req,res)=>{
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await postMessage.findById(id)
    const updatedpost = await postMessage.findByIdAndUpdate(id , {likecount:post.likecount+1} ,{new:true})
    res.json(updatedpost)
}
module.exports = {getPosts , createPost ,deletePost , likePost ,fetchPosts}