const httpStatus = require("http-status");
const ContactService = require("../services/Contact.service")
const catchAsync = require("../utils/CatchAsync")

class ContactController{
        static  AddContact = catchAsync(async(req,res)=>{
            const res_obj = await ContactService.AddContact(req?.body);
            res.status(httpStatus.OK).send(res_obj)
        }) 
}

module.exports = ContactController