const multer = require("multer");
const path = require("path");

// exports.UpdaloadImage= multer({
//     storage: multer.diskStorage({}),
//     fileFilter: (req,file,cb)=>{
//         let ext = path.extname(file.originalname);
//         if(ext !== '.jpg' && ext !== ".jpeg" && ext !== ".png" )
//         {
//             cb(new Error("file type is unsupported"),false);
//         }
//         cb(null,true);
//     }
// })


exports.UploadImage = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            cb(new Error('File type is unsupported'), false);
        }
        cb(null, true);
    }
});

exports.UpdaloadPDF= multer({
    storage: multer.diskStorage({}),
    fileFilter: (req,file,cb)=>{
        let ext = path.extname(file.originalname);
        if(ext !== '.pdf')
        {
            cb(new Error("file type is unsupported"),false);
        }
        cb(null,true);
    }
})

exports.UploadZIP= multer({
    storage: multer.diskStorage({}),
    fileFilter: (req,file,cb)=>{
        let ext = path.extname(file.originalname);
        if(ext !== '.zip')
        {
            cb(new Error("file type is unsupported"),false);
        }
        cb(null,true);
    }
})