import express from 'express'
import dotenv from 'dotenv'
import userRouter from './src/routes/users.route.js'
import bodyParser from 'body-parser'
import logger from './src/utils/logger.js'
import postRouter from './src/routes/postroutes.js'
import groupRouter from './src/routes/groupsRoutes.js'
import eventRouter from './src/routes/eventRoutes.js'
import messageRouter from './src/routes/messagesRoute.js'
import groupMemberRouter from './src/routes/groupMembersRoutes.js'
import commentRouter from './src/routes/commentRoutes.js'
import friendshipRouter from './src/routes/friendshipRoute.js'
// import cors from 'cors'
import cron from 'node-cron'
import cors from 'cors'

import { sendWelcomeEmailToNewUsers } from './src/config/mailConfig.js'
import notificationRouter from './src/routes/notificationRoutes.js'
import photoRouter from './src/routes/photoRoutes.js'
import videoRouter from './src/routes/videoRoutes.js'

// import cors from 'cors'

dotenv.config()



const app =express()
const port = process.env.API_PORT || 3000
// app.use (cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

//health route
app.get('/health',(req,res)=>{
    res.status(200).json({message:'Hello everyone .....I am happy'})
})


app.use('/api',userRouter);
app.use('/api',postRouter);
app.use('/api',groupRouter);
app.use('/event',eventRouter);
app.use('/message',messageRouter);
app.use('/group-members',groupMemberRouter);
app.use('/comment',commentRouter);
app.use('/friendship',friendshipRouter);
app.use('/notification',notificationRouter);
app.use('/photos',photoRouter);
app.use('/video',videoRouter)

// schedule sending email
cron.schedule('*/5 * * * * *', () => {

    logger.info("sending email after every five seconds ...............");
    sendWelcomeEmailToNewUsers()

});


app.listen(port, ()=>{
    logger.info(`The server is running on http://localhost:${port}`);
})


