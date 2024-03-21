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

UserSchema.pre('save', async function(next) {
    if (this.isModified('name')) {
        switch (this.user_type) {
            case userTypes.admin_user:
                this.name = this.name + "_admin";
                break;
            case userTypes.email_user:
                this.name = this.name + "_gmail";
                break;
            case userTypes.google_user:
                this.name = this.name + "_google";
                break;
            default:
                this.name = this.name
                // Do nothing if user_type is not recognized
                break;
        }
    }
    next();
});


module.exports =  mongoose.model( 'user' , UserSchema)