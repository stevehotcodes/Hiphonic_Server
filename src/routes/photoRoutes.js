import { Router } from "express";
import { getAllPhotos, uploadPhoto } from "../controllers/photo.controller.js";
import { verifyUserIdentity } from "../middlewares/userAuthMiddleware.js";



const photoRouter=Router();

photoRouter.get('/',getAllPhotos);
photoRouter.post('/',verifyUserIdentity,uploadPhoto)








export default photoRouter