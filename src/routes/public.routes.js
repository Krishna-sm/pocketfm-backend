const express = require("express")
const PublicConttroller = require("../controllers/public.controller")
const { LoggerModel } = require("../models")
const { ErrorValidation } = require("../middlewares/ErrorValidation")
const PublicValidation = require("../validations/Public.validation")
const router = express.Router()


router.use(async(req,res,next)=>{

    // console.log(req.ip);
    const checkExistIp = await LoggerModel.findOne({ip:req.ip})
            if(!checkExistIp){
                await LoggerModel.create({
                    ip:req.ip,
                    message:'Access Public Data'
                })
            }
    next()
})

router.route("/")
.get(PublicConttroller.getHomePageData)

router.route("/search")
.get(PublicConttroller.getNovelDataByQuery)


router.route("/novel/:slug")
.get(PublicValidation.publicNovelBySlug,ErrorValidation,PublicConttroller.getNovelBySlug)


module.exports = router