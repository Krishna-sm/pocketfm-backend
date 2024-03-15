const httpStatus = require("http-status");
const { NovelModel, NovelVideoModel } = require("../models");
const ApiError = require("../utils/ApiError");
const { SlugfyFun } = require("../constant");

class AdminNovelVideoService{
        static async AddNovelVideo(user,body){
                        const {novel,title,data,video_id} = body;

                        const checkExist = await NovelVideoModel.findOne({title: new RegExp(title),video_id});

                        if(checkExist){
                                throw new ApiError(httpStatus.BAD_REQUEST,"Video Already Exist");
                                return
                        }

                        const checkNovel = await NovelModel.findById(novel)
                        if(!checkNovel){
                               throw new ApiError(httpStatus.BAD_REQUEST,"Novel Not Found");
                                return  
                        }

                        await NovelVideoModel.create({
                                user:user,
                                novel,title,desc:data,video_id

                        })

                        return {
                                msg:"Video Added"
                        }
        }
        static async AllNovelVideos(user){

                        const checkExist = await NovelVideoModel.find().populate("novel","title").select("title isActive video_id");

                       

                        return {
                                msg:"Video Added",
                                videos:checkExist,
                                total:checkExist.length
                        }
        }

        static async NovelVideoById(user,id){
                const novelVideo = await NovelVideoModel.findById(id).select("title video_id desc novel");

                return novelVideo
        }

        static async NovelVideoByIdAndUpdate(user,id,body){
             const {novel,title,desc,video_id} = body;

                        const checkExist = await NovelVideoModel.findById(id);

                        if(!checkExist){
                                throw new ApiError(httpStatus.BAD_REQUEST,"Video Not Exist");
                                return
                        } 
                        const checkNovel = await NovelModel.findById(novel)
                        if(!checkNovel){
                               throw new ApiError(httpStatus.BAD_REQUEST,"Novel Not Found");
                                return  
                        }

                        await NovelVideoModel.findByIdAndUpdate(id,{
                                novel,title,desc:desc || checkExist.desc,video_id,slug:SlugfyFun(title)
                        })

                        return {
                                msg:"Novel Updated"
                        }

        }

        static async NovelVideoByIdAndDelete(user,id){
                                const checkExist = await NovelVideoModel.findByIdAndDelete(id);

                        if(!checkExist){
                                throw new ApiError(httpStatus.BAD_REQUEST,"Video Not Exist");
                                return
                        } 
                        return {
                                msg:"Novel Deleted"
                        }
        }
        static async NovelVideoByIdAndToggle(user,id){
                                const checkExist = await NovelVideoModel.findById(id);

                        if(!checkExist){
                                throw new ApiError(httpStatus.BAD_REQUEST,"Video Not Exist");
                                return
                        } 

                        await NovelVideoModel.findByIdAndUpdate(id,{
                                isActive:!checkExist.isActive
                        });

                        return {
                                msg:"Novel Updated"
                        }
        }

        
        
}


module.exports =AdminNovelVideoService