const express = require("express")
const PublicConttroller = require("../controllers/public.controller")
const { LoggerModel } = require("../models")
const { ErrorValidation } = require("../middlewares/ErrorValidation")
const PublicValidation = require("../validations/Public.validation")
const router = express.Router()
const AuthValidation = require("../middlewares/Validation")
const OptionalAuthentication = require("../middlewares/OptionalAuthentication")

const loggerOjb = {

}

router.use(OptionalAuthentication,async(req,res,next)=>{
        console.log("1",{user:req?.user})
        // console.log(req.ip);
        // const checkExistIp = await LoggerModel.findOne({ip:req.ip})
        const obj = {}
        obj['ip'] = req.ip;
        obj['message'] = `Access route  ${req.path}`
        if(req?.user){
            obj['user'] = req?.user
        }        
        if(req.path ==='/'){
        obj['message'] = `Access Dashboard`    
        }
        else if(req.path ==='/search'){
obj['message'] = `find novel query?=${req.query.query}`    
}
else if (req.path.startsWith('/novel')) {
    const pathSegments = req.path.split('/');
    const slug = pathSegments[2];
    const videoSlug = pathSegments[3];
    if (videoSlug && pathSegments.length === 4) {
       obj['message'] = `You are viewing the novel with slug: ${slug} and video with slug: ${videoSlug}`;
    } else if (!videoSlug && pathSegments.length === 3) {
       obj['message'] = `You are viewing the novel with slug: ${slug}`;
    } else if (videoSlug && pathSegments.length === 5 && pathSegments[4] === 'comment') {
       obj['message'] = `You are viewing comments for the novel with slug: ${slug} and video with slug: ${videoSlug}`;
    }
}




                await LoggerModel.create(obj)
       
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