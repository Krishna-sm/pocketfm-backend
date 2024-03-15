const mongoose = require('mongoose')   
const time =()=>  new Date().toLocaleDateString()+"   "+new Date().toLocaleTimeString() 
const LoggerSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
            ip:{
                type:String,
                required:true
            },
            latitude:{
                type:String,
                default:''
            },
            longitude:{
                type:String,
                default:''
            },
            message:{
                type:String,
                default:''
            },
            request_time:{
                type:String,
                default:time
            }
},{
    timestamps:true
})
module.exports =  mongoose.model( 'logger' , LoggerSchema)