import { Router } from "express";
import { verifyUserIdentity } from "../middlewares/userAuthMiddleware.js";
import { createNotification, deleteANotification, getAllNotifications } from "../controllers/notification.controller.js";
// import { getNotification } from "../services/notificationService.js";






const notificationRouter=Router()


notificationRouter.post('/:post_id',verifyUserIdentity,createNotification);
notificationRouter.get('/',verifyUserIdentity,getAllNotifications);
notificationRouter.delete('/:id',verifyUserIdentity,deleteANotification)




export default notificationRouter