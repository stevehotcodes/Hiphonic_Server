import { sendCreated, sendServerError, sendSuccess } from "../helpers/helper.function.js";
import { getAllPhotoService, uploadPhotoService } from "../services/photoService.js";


export  const uploadPhoto=async(req,res)=>{
   try {
        const user_id=req.user.user_id;
        const photoDetails={
             photo_url:req.body.photo_url,
             user_id:user_id
        }
        const result=await uploadPhotoService(photoDetails)
        sendCreated(res,"Photo Uploaded successfully")
        
    
   } catch (error) {
        sendServerError(res,error.message)
   }
}


export const getAllPhotos=async(req,res)=>{
    try{
         const result=await getAllPhotoService();
         return  res.status(200).json(result);
    }
    catch(error){
         return error
    }
}