const {body, param} = require("express-validator")


class AdminNovelValidation{
        static AddNovel = [
            body("title").isString().withMessage("title is required").trim(),
            body("desc").isString().withMessage("desc is required").trim()
        ]
         static NovelId = [
            param("id").isString().withMessage("Id is required").isMongoId().withMessage("Id  must be valid Id").trim()
        ]

         static UpdateNovel = [
            body("title").isString().withMessage("title is required").trim().optional(),
            body("desc").isString().withMessage("desc is required").trim().optional(),
        ]
  static AddNovelVideo = [
            body("title").isString().withMessage("title is required").trim(),
            body("data").isString().withMessage("data is required").trim().optional(),
            body("novel").isString().withMessage("novel is required").isMongoId().withMessage("Enter Valid Mongo id").trim(),
            body("video_id").isString().withMessage("novel is required").trim() ,
        ]
          static UpdateNovelVideo = [
            param("id").isString().withMessage("Id is required").isMongoId().withMessage("Id  must be valid Id").trim(),
            body("title").isString().withMessage("title is required").trim(),
            body("desc").isString().withMessage("desc is required").trim().optional(),
           body("novel").isString().withMessage("novel is required").isMongoId().withMessage("Enter Valid Mongo id").trim(),
            body("video_id").isString().withMessage("novel is required").trim() ,
        ]

}

module.exports ={
    AdminNovelValidation
}