import logger from "../utils/logger.js"
import { forbidden, notAuthorized, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError, sendSuccess } from "../helpers/helper.function.js";
import { createNotificationservice, deleteNotificationService, getAllNotificationService, getOneNotificationService } from "../services/notificationService.js";





export const createNotification=async(req,res)=>{
    try {
           const userID=req.user.user_id
           const postId=req.params.post_id;
           console.log("user id",userID)
           const response =await createNotificationservice(userID,postId);
        //    console.log(response)

           if(response.rowsAffected>0){
              sendCreated(res,'notification created successfully')
           }
           

    } catch (error) {
        // console.log(error)
        sendServerError(res,error.message)
    }
}

export const getAllNotifications=async(req,res)=>{
    try {
        const response=await getAllNotificationService();
        console.log(response)
        if(response.length==0){
            sendNotFound(res,'No notifications found')
        }
        else{
             return res.status(200).json(response)
        }
        
        
    } catch (error) {
        sendServerError(res,error.message)
        
    }
}

export const deleteANotification=async(req,res)=>{
    try {
        const id=req.params.id
        const notification=await getOneNotificationService(id)

        if(notification.length===0){
            sendNotFound(res,"Notification not found or it has already been deleted")
        }
        else{
         console.log(notification)
        const response=await deleteNotificationService(id);
        if(response.rowsAffected>0){
            sendDeleteSuccess(res,'Notification deleted successfully')
        }
            
        }
        
    } catch (error) {
        console.log(response)
        sendServerError(res,error.message)
    }
}