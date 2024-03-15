const mongoose = require('mongoose')    
const {faker } = require('@faker-js/faker')    
const { userTypes } = require('../constant')
const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        default : faker.person.firstName,
    },
    email:{
        type:String,
        required:[true,"email is required"],
        lower:true
    },  
    verified:{
        type:Boolean,
        default:false
    },
    user_type:{
        type:String,
        enum:Object.keys(userTypes),
        default:userTypes.email_user
    },
    isBlock:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

UserSchema.pre('save',async function (next){
    const user = this;
    if(this.isModified('name')){
        this.name = function(){
                switch(user.user_type){
                    case userTypes.admin_user :
                            return this.name+"_admin" 
                    case userTypes.email_user :
                return this.name+"_gmail" 
                   case userTypes.google_user :
                return this.name+"_google" 
                default : 
                return this.name
                }
        }
    }
    next()
})


module.exports =  mongoose.model( 'user' , UserSchema)