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
        isLike:{
              type:Boolean,
              default:true
        }

},{
    timestamps:true
})


const models = mongoose.model('NovelVideoLike',Schema);

module.exports = models