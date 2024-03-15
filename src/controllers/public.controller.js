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
    
    
}

module.exports = PublicConttroller