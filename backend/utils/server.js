import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import authRouter from '../routes/auth.route.js'
import listingRouter from '../routes/listing.route.js'
import path from 'path'

// creates the server with all the middlewares and routers
const createServer = () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log('Connected to mongoDB')
        })
        .catch((err) => {
            console.log(err)
        })

    const __dirname = path.resolve()

    const app = express()

    // middlewares
    app.use(express.json())
    app.use(cookieParser());

    app.use(express.static(path.join(__dirname, '/frontend/dist')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
    })

    // display request made to the api
    app.use((req, res, next) => {
        console.log(req.path, req.method)
        next()
    })

    app.use('/api/auth', authRouter)
    app.use('/api/listings', listingRouter)

    return app
}

export default createServer