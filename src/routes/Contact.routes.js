const express = require("express")
const ContactValidation = require("../validations/Contact.validation")
const { ErrorValidation } = require("../middlewares/ErrorValidation")
const ContactController = require("../controllers/Contact.controller")

const router = express.Router()

router.route("/")
.post(ContactValidation.ContactData,ErrorValidation,ContactController.AddContact)

module.exports = router