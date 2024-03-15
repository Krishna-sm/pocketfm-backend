const mongoose= require("mongoose")
const Schema = new mongoose.Schema({
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user'
            }
},{
    timestamps:true
}) 
const model = mongoose.model('profile',Schema)

module.exports = model