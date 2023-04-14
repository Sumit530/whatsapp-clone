const mongoose = require("mongoose")
const { stringify } = require("uuid")


const schema = new mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    username : {    
        type:String,
        require:true
    },
    phone : {
        type:Number,
        require:true
    },
    profile : {
        type:Number,
        default:null
    },
    recentchats : [
        {
           
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            created_at : {
                type:Date,
                default:Date.now()
            }
        }
    ]

},{timestamps:true})

const User = new mongoose.model('User',schema)
module.exports =  User