const {param,body} = require("express-validator")


class PublicValidation{

        static publicNovelBySlug = [
            param("slug").isString().withMessage("slug is Required for get novel")
        ]

         static publicNovelBySlugWithVideoSlug = [
            param("slug").isString().withMessage("slug is Required for get novel"),
            param("videoSlug").isString().withMessage("videoSlug is Required for get novel")
        ]

          static publicCommentNovelBySlugWithVideoSlug = [
            param("slug").isString().withMessage("slug is Required for get novel"),
            param("videoSlug").isString().withMessage("videoSlug is Required for get novel"),
            body("comment").isString().withMessage("comment is Required for get comment"),
        ]

}

module.exports = PublicValidation