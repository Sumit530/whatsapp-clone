const express = require("express")
const router = express.Router();
const User = require("../model/usermodel")
const Chat = require("../model/chatmodel")

router.post("/login",async(req,res)=>{
   const {username,phone} = req.body
try {
    

   const check = await User.find({username:username,phone:phone})
   if(check.length > 0){
    res.status(201).json({status:1,message:"logged in success",data:check})
   }
   else{
    res.status(401).json({status:0,message:"inlvalid username or password"})
   }
} catch (error) {
    res.status(401).json({status:0,message:"internal server error"})
    console.log("error on login api" + error)
}
})

router.post("/register",async(req,res)=>{
    const {username,phone,name} = req.body
    
 try {
     
 
    const check = await User.find({username:username,phone:phone})
    if(check.length > 0){
     res.status(201).json({status:0,message:"already exist"})
    }
    else{
    const user = new User({username,phone,name})
    const finaluser = await user.save()
    res.status(201).json({status:1,message:"regisert successfull",data:finaluser})
    }
 } catch (error) {
     res.status(401).json({status:0,message:"internal server error"})
     console.log("error on login api" + error)
 }
 })

 router.post("/getallusers",async(req,res)=>{
    try {
      const users = await User.find()
      if(users.length>0){
         res.status(201).json({status:1,message:"users found",data:users})
      }
      else{
         res.status(401).json({status:0,message:"users not found"})
      }
    } catch (error) {
      res.status(501).json({status:0,message:"internal server error"})
      console.log("error on login api" + error)
    }
 })
 router.post("/getrecentchat",async(req,res)=>{
   try {
      const {userid} = req.body
      const user = await User.find({_id:userid}).populate("recentchats","-recentchats")
      if(user.length>0){
         console.log(user[0].recentchats)
         res.status(201).json({status:1,message:"recent chat found",data:user[0].recentchats})
      }
      else{
         res.status(402).json({status:0,message:"users not found"})
      }
   } catch (error) {
      res.status(401).json({status:0,message:"internal server error"})
      console.log("error on login api" + error)
   }
 })

 router.post("/getmsg",async(req,res)=>{
   try {
      const {srcid,destid} = req.body     
      const user = await Chat.find({srcid:srcid,destid:destid}) 
      if(user.length>0){
         res.status(201).json({status:1,message:"users not found",user})
      }
      else{
         res.status(402).json({status:0,message:"chat not found"})
      }
   } catch (error) {
      res.status(401).json({status:0,message:"internal server error"})
      console.log("error on login api" + error)
   }
 })

module.exports = router