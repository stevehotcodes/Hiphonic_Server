import { poolRequest,sql } from "../utils/dbConnect.js";



export const followOtherUserService=async(follower_id,following_id)=>{
    try {

        const response=await poolRequest()
        .input('follower_id',sql.VarChar,follower_id)
        .input('following_id',sql.VarChar,following_id)
        .query(`
            INSERT INTO friendship(follower_id,following_id)
            VALUES(@follower_id,@following_id)
    
        `)
        return response
        
    } catch (error) {
        return error
    }
}

export const  getAllFollowersService=async(follower_id)=>{
    try{
        const response=await poolRequest()
        .input('follower_id',sql.VarChar,follower_id)
            .query(` 
                    SELECT friendship.*, tbl_user.user_id,tbl_user.email,tbl_user.tagname,tbl_user.username
                    FROM friendship 
                    INNER JOIN  tbl_user ON tbl_user.user_id=friendship.following_id
                    WHERE friendship.follower_id=@follower_id

                 `)
        return  response.recordset
    }
    catch(error){
      return error
    }
}
