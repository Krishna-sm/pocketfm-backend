// import {v2 as cloudinary} from 'cloudinary';
const cloudnary = require('cloudinary').v2;
          
cloudnary.config({ 
  cloud_name: 'dspqukl0w', 
  api_key: '659276576261211', 
  api_secret: 'X2d5bgEqnB3Q3KUU0JwY9w8Riqs' ,
  
});


exports.UploadImage = async(file,folder)=>{
    const result= await cloudnary.uploader.upload(file,{
        folder:folder
    })
    return result
}


exports.deleteImage = async(public_id)=>{
    const result= await cloudnary.uploader.destroy(public_id)
    return result
}





