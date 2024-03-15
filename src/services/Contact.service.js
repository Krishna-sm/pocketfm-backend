const httpStatus = require("http-status");
const { CurrentDay } = require("../constant");
const { ContactModel } = require("../models");
const ApiError = require("../utils/ApiError");
const axios = require("axios");

class ContactService{
    static async AddContact(body){

                const { email,message,name,token } = body;

                const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.CAPTCHA_SCREATE_EKY,
          response: token,
        },
      }
    );

    if (!response.data.success) {
            throw new ApiError(httpStatus.BAD_REQUEST,"Captcha Not Valid")
        return
    }
        // check exist 

        const checkExist = await ContactModel.findOne({
            email,
             createdAt: { $gte: CurrentDay.toDate() },
        })

          if (checkExist) {
  throw new ApiError(httpStatus.BAD_REQUEST,"Kindly Contact After 24 hour ");
                return
}

await ContactModel.create({
    email,message,name,token
})
 
        return{
            msg:'Thanks For Contacting'
        }

    }
}

module.exports = ContactService