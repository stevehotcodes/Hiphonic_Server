import { poolRequest,sql } from "../utils/dbConnect.js";
import * as uuid from 'uuid'



export const uploadPhotoService=async()=>{
    try {
        const photo_id=uuid.v4();
        const  result=await poolRequest()
        .input("photo_id",sql.VarChar,photo_id)
        .input("user_id",sql.VarChar,post.user_id)
        .input("photo_url",sql.VarChar,post.image)
        .input("isProfileImage",sql.Int,0)
        .query(`INSERT INTO photo (photo_id,user_id,photo_url,isProfileImage)VALUES (@photo_id,@user_id, @photo_url,0)`);

        return result

    } catch (error) {
        return error
    }
}


export const getAllPhotoService=async()=>{
    try{
         const result=await poolRequest()
         .query(`SELECT * FROM photo`)
         return result.recordset
        
        }
    catch(error){
         return error
    }
}