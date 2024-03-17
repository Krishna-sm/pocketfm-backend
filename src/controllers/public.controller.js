const httpStatus = require("http-status");
const PublicService = require("../services/Public.service")
const catchAsync = require("../utils/CatchAsync")

class PublicConttroller{

    static  getHomePageData=catchAsync(async(req,res)=>{
        const res_obj =  await PublicService.getHomePageData();
        res.status(httpStatus.OK).send(res_obj);
    }) 

 static  getNovelDataByQuery=catchAsync(async(req,res)=>{
        const res_obj =  await PublicService.getNovelDataByQuery(req?.query?.query);
        res.status(httpStatus.OK).send(res_obj);
    }) 
     static  getNovelBySlug=catchAsync(async(req,res)=>{
        const res_obj =  await PublicService.getNovelBySlug(req?.params?.slug);
        res.status(httpStatus.OK).send(res_obj);
    }) 

       static  publicNovelBySlugWithVideoSlug=catchAsync(async(req,res)=>{
        const res_obj =  await PublicService.publicNovelBySlugWithVideoSlug(req?.params?.slug,req?.params?.videoSlug);
        res.status(httpStatus.OK).send(res_obj);
    }) 
       static  publicCommentNovelBySlugWithVideoSlug=catchAsync(async(req,res)=>{
        const res_obj =  await PublicService.publicCommentNovelBySlugWithVideoSlug(req?.params?.slug,req?.params?.videoSlug,req?.body,req?.user);
        res.status(httpStatus.OK).send(res_obj);
    }) 
     static  getAllpublicCommentNovelBySlugWithVideoSlug=catchAsync(async(req,res)=>{
        const res_obj =  await PublicService.getAllpublicCommentNovelBySlugWithVideoSlug(req?.params?.slug,req?.params?.videoSlug);
        res.status(httpStatus.OK).send(res_obj);
    }) 
    
    
    
}

module.exports = PublicConttroller