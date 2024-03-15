const express = require("express")
const AuthValidation = require("../middlewares/Validation")
const { VerifyAdmin } = require("../middlewares/VerifyAdmin")
const { AdminNovelValidation } = require("../validations/AdminNovel.validation")
const { ErrorValidation } = require("../middlewares/ErrorValidation")
const AdminNovelVideoController = require("../controllers/AdminNovelVideo.controller")

const router = express.Router()

router.route("/create")
.post(AuthValidation,VerifyAdmin,AdminNovelValidation.AddNovelVideo,ErrorValidation,AdminNovelVideoController.AddNovelVideo)

router.route("/all-videos")
.get(AuthValidation,VerifyAdmin,AdminNovelVideoController.AllNovelVideos)


router.route("/get/:id")
.get(AuthValidation,VerifyAdmin,AdminNovelVideoController.NovelVideoById)

router.route("/update/:id")
.put(AuthValidation,VerifyAdmin,AdminNovelValidation.UpdateNovelVideo,ErrorValidation,AdminNovelVideoController.NovelVideoByIdAndUpdate)

router.route("/delete/:id")
.delete(AuthValidation,VerifyAdmin,AdminNovelValidation.NovelId,ErrorValidation,AdminNovelVideoController.NovelVideoByIdAndDelete)

router.route("/toggle/:id")
.put(AuthValidation,VerifyAdmin,AdminNovelValidation.NovelId,ErrorValidation,AdminNovelVideoController.NovelVideoByIdAndToggle)


module.exports = router