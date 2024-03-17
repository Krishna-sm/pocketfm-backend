const mongoose = require("mongoose")

const Schema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    novel:{
          type:mongoose.Schema.Types.ObjectId,
        ref:'novel',
        required:true
    },
      video:{
          type:mongoose.Schema.Types.ObjectId,
        ref:'video',
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    edited:{
        type:Boolean,
        default:false
    },
    whoEdit:{
        type:String,
        default:null
    }

},{timestamps:true})



module.exports = mongoose.model("video_comment",Schema)