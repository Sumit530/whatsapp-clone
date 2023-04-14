
const User = require("../model/chatmodel")
const Chat = require("../model/chatmodel")
global.onlineusers = new Map()
const users = []
 exports = module.exports  = (io) =>{
    io.on("connection",(socket)=>{

    
    socket.on("add-user",(userid)=>{
        console.log(userid)
        onlineusers.set( userid,socket.id)
        socket.broadcast.emit('userisonline',userid)
        console.log(onlineusers)
    })
    socket.on("typing",(id)=>{

        socket.broadcast.to(onlineusers.get(id)).emit("usertyping")
    })
    socket.on("sendmsg",async({stypmsg,userid,destid})=>{
        const getuser = onlineusers.get(destid)
        
        if(getuser){
            socket.to(getuser).emit("msg-recieve",stypmsg,userid)
        }
        const chat = new Chat({srcuser:userid,destuser:destid})
        await chat.save()
        await User.findOneAndUpdate({_id:destid,recentchats:{$ne:userid}},{$push:{recentchats:userid}})
        await User.findOneAndUpdate({_id:userid,recentchats:{$ne:destid}},{$push:{recentchats:destid}})
    })
    
    socket.emit("get-user",users)
    socket.on("join-room",(roomid,name,id)=>{
        
        socket.join(roomid);
        socket.broadcast.to(roomid).emit("user-connected",userid)
        socket.on("message",(message)=>{
            io.to(roomid).emit("sendmessage",message,roomid)
        })
    })
})
}
