const httpStatus = require("http-status");
const { NovelModel, NovelVideoModel } = require("../models");
const ApiError = require("../utils/ApiError");

class PublicService{

    static async getHomePageData(){
        const resOjb ={}
   const novels_data = await NovelModel.find({ isActive: false })
   .sort({ created_at: -1 })
   .limit(20)
   
   .lean();


resOjb['images'] = await novels_data.map(obj => obj.image.uri);
resOjb['novels'] = await novels_data.map(obj => ({image:obj.image.uri,slug:obj.slug,title:obj.title}));
   
        return resOjb
    }

    static async getNovelDataByQuery(query){
        if(!query){
            return {
                msg:"Novel Fetched",
                novels:[],
                total:0
            }
        }

                   const novels =  await NovelModel.find({slug:new RegExp(query,"i")}).select("title slug image.uri -_id")

                   return {
                    msg:"Novel Fetched",
                    novels:novels,
                    total:novels.length
                   }



    }

    static async getNovelBySlug(slug){
                const novel = await NovelModel.findOne({slug:slug}).select("title slug desc desc image.uri  ")
                    if(!novel){
                        throw new ApiError(httpStatus.BAD_REQUEST,"novel not found")
                        return
                    }

                    const videos = await NovelVideoModel.find({novel:novel._id}).select("title slug");

                    return {
                        msg:"Novel Fetched",
                        novel,
                        videos
                    }
    } 

}

module.exports = PublicService