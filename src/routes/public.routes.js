const express = require("express")
const PublicConttroller = require("../controllers/public.controller")
const { LoggerModel } = require("../models")
const { ErrorValidation } = require("../middlewares/ErrorValidation")
const PublicValidation = require("../validations/Public.validation")
const router = express.Router()
const AuthValidation = require("../middlewares/Validation")

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


router.route("/novel/:slug/:videoSlug")
.get(PublicValidation.publicNovelBySlugWithVideoSlug,ErrorValidation,PublicConttroller.publicNovelBySlugWithVideoSlug)



router.route("/novel/:slug/:videoSlug/comment")
.post(AuthValidation,PublicValidation.publicCommentNovelBySlugWithVideoSlug,ErrorValidation,PublicConttroller.publicCommentNovelBySlugWithVideoSlug)
.get(PublicValidation.publicNovelBySlugWithVideoSlug,ErrorValidation,PublicConttroller.getAllpublicCommentNovelBySlugWithVideoSlug)


module.exports = router