// import { VarChar } from "mssql";
import { poolRequest ,sql} from "../utils/dbConnect.js";
import * as uuid from 'uuid'



export const createNotificationservice=async(userId,postId)=>{
    try {
        
        const id=uuid.v4();
       
        const transaction = new sql.Transaction()
        await transaction.begin();
        const result1=await poolRequest(transaction)

        .input('id',sql.VarChar,id)
        .input('user_id',sql.VarChar,userId)
        .input('post_id',sql.VarChar,postId)
        .query(
            `INSERT INTO tbl_notification(id,user_id,post_id)
             VALUES(@id,@user_id,@post_id)
            `
            
        );

        const result2=await poolRequest(transaction)
        .input('post_id',sql.VarChar,postId)
        .query(
                    `
                    UPDATE post
                    SET likes=likes+1
                    WHERE post_id=@post_id
                   `

        )

        return {result1,result2}
        
    } catch (error) {
       return error 
    }
}


export const getAllNotificationService=async()=>{
    try{
          const result =await poolRequest()
          .query(`SELECT tbl_user.username, tbl_user.email, tbl_notification.*
                    FROM tbl_notification
                    INNER JOIN tbl_user ON tbl_user.user_id=tbl_notification.user_id              
  
                    `);
           return result.recordset
    }
    catch(error){
        return error
    }

}


export const deleteNotificationService=async(notificationID)=>{
    try{
         const result =await poolRequest()
         .input('id', sql.VarChar,notificationID)
         .query(
            `DELETE FROM tbl_notification WHERE id=@id`
         )

         return result
  
    }
    catch(error){
        return error 

    }
}

export const getOneNotificationService=async(notificationID)=>{
    try{
        const result=await poolRequest()
        .input('id',sql.VarChar,notificationID)
        .query(`SELECT * FROM tbl_notification WHERE id=@id`)
        return result.recordset

    }
    catch(error){
         return error

    }
}









