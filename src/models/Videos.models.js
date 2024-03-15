const mongoose = require("mongoose")
const { SlugfyFun } = require("../constant")

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
            title:{
                type:String,
                required:true,
                unique:true,
                trim:true
            },
            slug:{
                type:String,
                default:''
            },
            video_id:{
                type:String,
                required:true,
                trim:true
            },
            desc:{
                type:String,
                default:''
            },
            isActive:{
                type:Boolean,
                default:true
            },
            

},{
    timestamps:true
})


Schema.pre("save",function(next){
        const user = this
    if(user.isModified("title")){
        this.slug = SlugfyFun(user.title)
    }
    next()
})



module.exports = mongoose.model("video",Schema)