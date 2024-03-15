const httpStatus = require("http-status");
const AdminNovelVideoService = require("../services/AdminNovelVideo.service")
const catchAsync = require("../utils/CatchAsync")

class AdminNovelVideoController{
        static AddNovelVideo = catchAsync(async(req,res)=>{
            const res_obj = await AdminNovelVideoService.AddNovelVideo(req?.user,req.body);
            res.status(httpStatus.CREATED).send(res_obj)
        })
             static AllNovelVideos = catchAsync(async(req,res)=>{
            const res_obj = await AdminNovelVideoService.AllNovelVideos(req?.user);
            res.status(httpStatus.OK).send(res_obj)
        })

           static NovelVideoById = catchAsync(async(req,res)=>{
            const res_obj = await AdminNovelVideoService.NovelVideoById(req?.user,req?.params?.id);
            res.status(httpStatus.OK).send(res_obj)
        })

        
           static NovelVideoByIdAndUpdate = catchAsync(async(req,res)=>{
            const res_obj = await AdminNovelVideoService.NovelVideoByIdAndUpdate(req?.user,req?.params?.id,req?.body);
            res.status(httpStatus.OK).send(res_obj)
        })
          static NovelVideoByIdAndDelete = catchAsync(async(req,res)=>{
            const res_obj = await AdminNovelVideoService.NovelVideoByIdAndDelete(req?.user,req?.params?.id);
            res.status(httpStatus.OK).send(res_obj)
        })
         static NovelVideoByIdAndToggle = catchAsync(async(req,res)=>{
            const res_obj = await AdminNovelVideoService.NovelVideoByIdAndToggle(req?.user,req?.params?.id);
            res.status(httpStatus.OK).send(res_obj)
        })



        
}


module.exports= AdminNovelVideoController