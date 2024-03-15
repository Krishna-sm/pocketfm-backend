const mongoose = require("mongoose")
const { SlugfyFun } = require("../constant")

const Schema = new mongoose.Schema({
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user',
                required:true
            },
            title:{
                type:String,
                required:true,
                trim:true
            },
            slug:{
                type:String,
                trim:true
            },
            desc:{
                type:String,
                required:true,
                trim:true
            },
            image:{
                type:{
                    uri:{
                        type:String
                    },
                    public_id:{
                        type:String
                    }
                },
                required:true
            },
            isActive:{
                type:Boolean,
                default:false
            },
            
},{timestamps:true})

Schema.pre("save",function(next){
        const user = this
    if(user.isModified("title")){
        this.slug = SlugfyFun(user.title)
    }
    next()
})


Schema.pre(/^update/,function(next){
  const user = this;
  // Assuming 'update' method modifies the 'title' field
  if (user.getUpdate().$set && user.getUpdate().$set.title) {
    user.slug = SlugfyFun(user.getUpdate().$set.title);
  }
  next();
})

module.exports = mongoose.model("novel",Schema)


