const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require("cors")
const ApiError = require('./utils/ApiError')
const httpStatus = require('http-status')
const { ErrorHandling } = require('./middlewares/ErrorHandling')
const ExpressSession = require("express-session")
const {passPort} = require("./utils/passport")
const requestIp = require("request-ip")

// middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json({limit:'100mb'}))
app.use(express.urlencoded({extended:false}))
app.use(requestIp.mw())

// authenticaion middlwares
app.use(ExpressSession({
  secret:"!@#$%^Y&UI",
  resave:false,
  saveUninitialized:false
}))
app.use(passPort.initialize())
app.use(passPort.session())

// routes
app.use("/api/v1",require("./routes"))


// not found
app.use("*",()=>{
     throw new ApiError(httpStatus.NOT_FOUND,"page not found")
})

// error middlware 
app.use(ErrorHandling)

module.exports = app

 