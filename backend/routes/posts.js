const express = require('express');

const router = express.Router();
const {getPosts ,createPost ,deletePost ,likePost ,fetchPosts} = require('../controllers/posts');
const fetchUser = require('../middleware/fetchUser');

router.get('/:id', getPosts)
router.get('/', getPosts)
router.get('/post', fetchPosts);
// router.get('/userposts',fetchUser,getUserPosts)
router.post('/' ,fetchUser,createPost)
router.delete('/:id', deletePost);
router.patch('/:id/likePost' ,likePost)
//  async(req,res)=>{
//     try {
//         // const id = req.user.id;
//         const result = await postMessage.find({user: req.user.id })
//         res.status(200).json(result)
        
//     } catch (error) {
//         res.status(404).json({message:error.message})
//     }

// }
module.exports=router;