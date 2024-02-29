import { Router } from "express";
import { fetchVideo, uploadVideo } from "../controllers/video.controller.js";
import { verifyUserIdentity } from "../middlewares/userAuthMiddleware.js";





const videoRouter=Router()

videoRouter.post('/',verifyUserIdentity,uploadVideo);
videoRouter.get('/',fetchVideo)






export default videoRouter