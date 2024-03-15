const httpStatus = require("http-status");
const AdminNovelService = require("../services/AdminNovel.service")
const catchAsync = require("../utils/CatchAsync")

class AdminNovelController{
    static AddNovel = catchAsync(async(req,res)=>{
        const res_obj = await AdminNovelService.AddNovel(req?.user,req?.body,req?.file);
        res.status(httpStatus.CREATED).send(res_obj)
    })
      static getAllNovel = catchAsync(async(req,res)=>{
        const res_obj = await AdminNovelService.getAllNovel(req?.user);
        res.status(httpStatus.OK).send(res_obj)
    })
      static getNovelById = catchAsync(async(req,res)=>{
        const res_obj = await AdminNovelService.getNovelById(req?.user,req?.params?.id);
        res.status(httpStatus.OK).send(res_obj)
    })
 static getNovelByIdToggle = catchAsync(async(req,res)=>{
        const res_obj = await AdminNovelService.getNovelByIdToggle(req?.user,req?.params?.id);
        res.status(httpStatus.OK).send(res_obj)
    })

 static getNovelByIdAndDelete = catchAsync(async(req,res)=>{
        const res_obj = await AdminNovelService.getNovelByIdAndDelete(req?.user,req?.params?.id);
        res.status(httpStatus.OK).send(res_obj)
    })
    


     static getNovelByIdAndUpdate = catchAsync(async(req,res)=>{
        const res_obj = await AdminNovelService.getNovelByIdAndUpdate(req?.user,req?.body,req?.file,req?.params?.id);
        res.status(httpStatus.OK).send(res_obj)
    })
    

    
}


module.exports =AdminNovelController