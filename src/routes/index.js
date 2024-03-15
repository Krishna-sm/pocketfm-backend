const router = require('express').Router()
const AuthRouter = require("./Auth.routes")
const ContactRoute = require("./Contact.routes")
const AdminNovel = require("./AdminNovel.routes")
const AdminVideo = require("./AdminVideo.routes")
const PublicRoute = require("./public.routes")
const routes = [
    {
        path:'/auth',
        route:AuthRouter
    },{
        path:'/contact',
        route:ContactRoute
    },{
        path:'/admin/novel',
        route:AdminNovel
    },
    {
        path:'/admin/video',
        route:AdminVideo
    }, {
        path:'/public',
        route:PublicRoute
    }
] 

routes.map((cur)=>{
    router.use(cur.path,cur.route)
})





module.exports  = router