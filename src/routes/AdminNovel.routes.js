const AdminNovelController = require("../controllers/AdminNovel.controller")
const { ErrorValidation } = require("../middlewares/ErrorValidation")
const AuthValidation = require("../middlewares/Validation")
const { VerifyAdmin } = require("../middlewares/VerifyAdmin")
const { UploadImage } = require("../utils/multer")
const { AdminNovelValidation } = require("../validations/AdminNovel.validation")

const express = require("express")
const router = express.Router()


router.route("/create")
.post(AuthValidation,VerifyAdmin, UploadImage.single("image"), AdminNovelValidation.AddNovel, ErrorValidation,AdminNovelController.AddNovel )


router.route("/all-novels")
.get(AuthValidation,VerifyAdmin, ErrorValidation,AdminNovelController.getAllNovel )

router.route("/novels/:id")
.get(AuthValidation,VerifyAdmin, AdminNovelValidation.NovelId, ErrorValidation,AdminNovelController.getNovelById )


router.route("/toggle/:id")
.put(AuthValidation,VerifyAdmin, AdminNovelValidation.NovelId, ErrorValidation,AdminNovelController.getNovelByIdToggle )
router.route("/delete/:id")
.delete(AuthValidation,VerifyAdmin, AdminNovelValidation.NovelId, ErrorValidation,AdminNovelController.getNovelByIdAndDelete )

router.route("/update/:id")
.patch(AuthValidation,VerifyAdmin, UploadImage.single("image"), AdminNovelValidation.UpdateNovel, ErrorValidation,AdminNovelController.getNovelByIdAndUpdate )


// export default router
module.exports = router

