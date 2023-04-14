  const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const path = require("path")
const cors =  require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const multer = require('multer');

const upload = multer();
app.use(upload.none())
app.use(bodyParser.json())
app.use(cors())
const router = require('./router/routes')
const io = require("socket.io")(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods :["GET","POST"] 
    }})
    
const rootsocket = require("./socket/socket")(io) 
const {v4:uuidv4} = require("uuid")

app.use(express.static("public"));
app.set("view engine","ejs")
// app.get("/",(req,res)=>{
//     res.redirect(`/${uuidv4()}`)
// })

 
// connection 
mongoose.set('strictQuery', true)
mongoose.connect("mongodb://localhost:27017/chatapp",{
  useNewUrlParser: true,
      useUnifiedTopology: true,
}
).then(()=>{
  console.log("mongodb connected successfully");
}
).catch((e)=>
  console.log("connection failed"+e)
)





app.use(router)
server.listen(7000,()=>{
    console.log("server is running on port 7000")
})