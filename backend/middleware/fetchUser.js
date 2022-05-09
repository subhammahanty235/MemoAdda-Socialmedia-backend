const jwt = require("jsonwebtoken");

const fetchUser = async(req,res,next)=>{
    try {
        const token = req.header('auth-token')
        if(!token){
            res.status(401).send({error : "please authenticte using a valid token"})
        }
        const data = jwt.verify(token , process.env.JWT_SEC)
        req.user = data.user
        next()
        
    } catch (error) {
        
    res.status(401).send({error : "some error occured"})
}
}

module.exports = fetchUser