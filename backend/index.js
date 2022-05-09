const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.json({limit:"30mb" , extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.use('/posts',require('./routes/posts'));
app.use('/auth',require('./routes/auths'))
//database connection
const conn_url = process.env.mongo_uri
const port = 5000
mongoose.connect(conn_url)
.then(()=>app.listen(port,()=>{console.log("server running")}))
.catch((error)=>{console.log(error.message)})



