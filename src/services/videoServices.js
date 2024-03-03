import { poolRequest,sql } from "../utils/dbConnect.js";
import * as uuid from 'uuid'

export const uploadVideoService=async(videoDetails)=>{
    try {
          const video_id=uuid.v4();
          const response=await poolRequest()
            .input('video_id',sql.VarChar,video_id)
            .input('video_description',sql.VarChar,videoDetails.video_description)
            .input('user_id',sql.VarChar,videoDetails.user_id)
            .input('video_url',sql.VarChar,videoDetails.video_url)
     
          .query(`
                INSERT INTO video (video_id,video_description,user_id,video_url)
                VALUES(@video_id,@video_description,@user_id,@video_url)
          
          `)
          console.log(response)
          return response
        
    } catch (error) {
        return error
    }
}

export const fetchVideoService=async()=>{
    try {
         const result=await poolRequest()
         .query(`SELECT tbl_user.username, video.* FROM video
                 INNER JOIN tbl_user ON tbl_user.user_id=video.user_id
         
         `)

         return result.recordset
        
    } catch (error) {
        return error
    }
}