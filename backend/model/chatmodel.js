const mongoose = require("mongoose")
const { stringify } = require("uuid")


const schema = new mongoose.Schema({
    srcuser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    destuser : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    created_at : {
            type:Date,
            default:Date.now()
        }
   

})

const Chat = new mongoose.model('chat',schema)
module.exports =  Chat