import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import userRouter from '../routes/user.route.js'
import authRouter from '../routes/auth.route.js'

// creates the server with all the middlewares and routers
const createServer = () => {
    mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to mongoDB')
    })
    .catch((err) => {
        console.log(err)
    })

    const app = express()

    // middlewares
    app.use(express.json())
    app.use(cookieParser());

    // display request made to the api
    app.use((req, res, next) => {
        console.log(req.path, req.method)
        next()
    })

    app.use('/api/user', userRouter)
    app.use('/api/auth', authRouter)

    return app
}

export default createServer