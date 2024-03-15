const httpStatus = require("http-status");
const { NovelModel } = require("../models");
const ApiError = require("../utils/ApiError");
const { UploadImage, deleteImage } = require("../config/cloduinary");
const { SlugfyFun } = require("../constant");

class AdminNovelService {
  static async AddNovel(user, body, file) {
    // console.log("come here");
    if (!file) {
      throw new ApiError(httpStatus.BAD_REQUEST, "File must be required");
      return;
    }
    const checkExistNovel = await NovelModel.findOne({
      title: new RegExp(body.title, "i"),
    });

    if (checkExistNovel) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Novel Title Already Exist");
      return;
    }

    const result = await UploadImage(file.path, "novels");
    await NovelModel.create({
      title: body.title,
      desc: body.desc,
      image: {
        uri: result.secure_url,
        public_id: result.public_id,
      },
      user,
    });

    return {
      msg: "Novel Created",
    };
  }

  static async getAllNovel(user) {
    const checkExistNovel = await NovelModel.find({}).select("image.uri title desc isActive slug  _id");

    return {
      msg: "Novel fetched",
      novels: checkExistNovel,
      total: checkExistNovel.length,
    };
  }
  static async getNovelById(user, id) {
    const checkExistNovel = await NovelModel.findById(id).select("image.uri title desc isActive slug  _id");
    if (!checkExistNovel) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Novel Not Exist");
      return;
    }
    return {
      msg: "Novel fetched",
      novel: checkExistNovel,
    };
  }

  static async getNovelByIdToggle(user, id) {
    const checkExistNovel = await NovelModel.findById(id);
    if (!checkExistNovel) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Novel Not Exist");
      return;
    }

    await NovelModel.findByIdAndUpdate(id, {
      isActive: !checkExistNovel.isActive,
    });

    return {
      msg: "Novel update",
    };
  }
  static async getNovelByIdAndDelete(user, id) {
    const checkExistNovel = await NovelModel.findById(id);
    if (!checkExistNovel) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Novel Not Exist");
      return;
    }     

        deleteImage(checkExistNovel.image.public_id);
        

    await NovelModel.findByIdAndDelete(id);

    return {
      msg: "Novel Deleted",
    };
  }

  
  static async getNovelByIdAndUpdate(user, body, file, id) {
    const obj = {};
    const checkExistNovel = await NovelModel.findById(id);
    if (!checkExistNovel) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Novel Not Exist");
      return;
    }
    if (file) {
      await deleteImage(checkExistNovel.image.public_id);
      const result = await UploadImage(file.path, "novels");
      obj["image"] = {
        uri: result.secure_url,
        public_id: result.public_id,
      };
    }
    if (body.title) {
      obj["title"] = body.title;
      obj["slug"] = SlugfyFun(body.title);
    }
    if (body.desc) {
      obj["desc"] = body.desc;
    }
      console.log(obj);
    await NovelModel.findByIdAndUpdate(id, {
      ...obj,
    });

    return {
      msg: "Novel Update Successfully" 
    };
  }
}

module.exports = AdminNovelService;
