const {param} = require("express-validator")


class PublicValidation{

        static publicNovelBySlug = [
            param("slug").isString().withMessage("slug is Required for get novel")
        ]

}

module.exports = PublicValidation