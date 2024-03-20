const httpStatus = require("http-status");
const {
  NovelModel,
  NovelVideoModel,
  UserModel,
  NovelVideoCommentModel,
  NovelVideoLikeModel,
} = require("../models");
const ApiError = require("../utils/ApiError");

class PublicService {
  static async getHomePageData() {
    const resOjb = {};
    const novels_data = await NovelModel.find({ isActive: false })
      .sort({ created_at: -1 })
      .limit(20)

      .lean();

    resOjb["images"] = await novels_data.map((obj) => obj.image.uri);
    resOjb["novels"] = await novels_data.map((obj) => ({
      image: obj.image.uri,
      slug: obj.slug,
      title: obj.title,
    }));

    return resOjb;
  }

  static async getNovelDataByQuery(query) {
    if (!query) {
      return {
        msg: "Novel Fetched",
        novels: [],
        total: 0,
      };
    }

    const novels = await NovelModel.find({
      slug: new RegExp(query, "i"),
    }).select("title slug image.uri -_id");

    return {
      msg: "Novel Fetched",
      novels: novels,
      total: novels.length,
    };
  }

  static async getNovelBySlug(slug) {
    const novel = await NovelModel.findOne({ slug: slug }).select(
      "title slug desc desc image.uri  "
    );
    if (!novel) {
      throw new ApiError(httpStatus.BAD_REQUEST, "novel not found");
      return;
    }

    const videos = await NovelVideoModel.find({ novel: novel._id }).select(
      "title slug"
    );

    return {
      msg: "Novel Fetched",
      novel,
      videos,
    };
  }

  static async publicNovelBySlugWithVideoSlug(slug, video_slug,user) {
    const novel = await NovelModel.findOne({ slug: slug }).select(
      "image.uri title"
    );
    if (!novel) {
      throw new ApiError(httpStatus.BAD_REQUEST, "novel not found");
      return;
    }

    const video = await NovelVideoModel.findOne({
      slug: video_slug,
      novel: novel._id,
    }).select("title slug video_id desc _id");

    if (!video) {
      throw new ApiError(httpStatus.BAD_REQUEST, "video not found");
    }

    const Othervideo = await NovelVideoModel.find({
      novel: novel._id,
      _id: { $ne: video._id },
    }).select("slug title -_id createdAt");
            
            if(user){

                
                    const isLikeVideo = await NovelVideoLikeModel.findOne({
                        user,
                        novel:novel._id,
                        video:video._id
                    })

                     return {
      video,
      Othervideo,
      novel,
      isLike:isLikeVideo?.isLike
    };
            }

    return {
      video,
      Othervideo,
      novel,
      isLike:false
    };
  }

  static async publicCommentNovelBySlugWithVideoSlug(
    slug,
    video_slug,
    body,
    user
  ) {
    const userd = await UserModel.findById(user);
    if (!userd) {
      throw new ApiError(httpStatus.NOT_FOUND, "User Details Not found");
    }

    const novel = await NovelModel.findOne({ slug: slug });
    if (!novel) {
      throw new ApiError(httpStatus.BAD_REQUEST, "novel not found");
      return;
    }

    const video = await NovelVideoModel.findOne({
      slug: video_slug,
      novel: novel._id,
    });

    if (!video) {
      throw new ApiError(httpStatus.BAD_REQUEST, "video not found");
    }

    await NovelVideoCommentModel.create({
      user,
      novel: novel._id,
      video: video._id,
      comment: body.comment,
    });

    return {
      msg: "Chat Added :)",
    };
  }

  static async getAllpublicCommentNovelBySlugWithVideoSlug(slug, video_slug) {
    // const userd = await UserModel.findById(user);
    // if(!userd){
    //     throw new ApiError(httpStatus.NOT_FOUND,"User Details Not found");
    // }

    const novel = await NovelModel.findOne({ slug: slug });
    if (!novel) {
      throw new ApiError(httpStatus.BAD_REQUEST, "novel not found");
      return;
    }

    const video = await NovelVideoModel.findOne({
      slug: video_slug,
      novel: novel._id,
    });

    if (!video) {
      throw new ApiError(httpStatus.BAD_REQUEST, "video not found");
    }

    const novelVideoComments = await NovelVideoCommentModel.find({
      novel: novel._id,
      video: video._id,
      isActive: true,
    })
      .populate("user", "name -_id")
      .select("comment createdAt -_id");

    return novelVideoComments;
  }

  static async AddpublicLikeNovelBySlugWithVideoSlug(slug, video_slug, user) {
    const userd = await UserModel.findById(user);
    if (!userd) {
      throw new ApiError(httpStatus.NOT_FOUND, "User Details Not found");
    }

    const novel = await NovelModel.findOne({ slug: slug });
    if (!novel) {
      throw new ApiError(httpStatus.BAD_REQUEST, "novel not found");
      return;
    }

    const video = await NovelVideoModel.findOne({
      slug: video_slug,
      novel: novel._id,
    });

    if (!video) {
      throw new ApiError(httpStatus.BAD_REQUEST, "video not found");
    }

    const isLikeDocument = await NovelVideoLikeModel.findOne({
      novel: novel._id,
      video: video._id,
      user,
    });

    console.log(isLikeDocument)

    if (isLikeDocument) {
      await NovelVideoLikeModel.findByIdAndUpdate(isLikeDocument._id, {
        isLike: !isLikeDocument.isLike,
      });

      return {
        msg:`Video ${isLikeDocument.isLike?'disliked':'liked'} successfully`
      }
    }
             await NovelVideoLikeModel.create({
      novel: novel._id,
      video: video._id,
      user,
    });
return {
        msg:`Video Liked successfully`
      }

  }
}

module.exports = PublicService;
