const mongoose = require("mongoose")

const otpModel = new mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        otp:{
            type:Number,
            required:true
        },
        try_limit:{
            type:Number,
            default:0
        },
        isVerified:{
            type:Boolean,
            default:false
        },
        purpose:{
            type:String,
            required:true
        },
        isResend:{
            type:Boolean,
            default:false
        }
},{
    timestamps:true
})

const model = mongoose.model('otpModel',otpModel);
module.exports = model