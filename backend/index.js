import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

import { handleError } from './middleware/handleError.js'

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

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

// handle error
app.use(handleError)

const port = 3000
app.listen(3000, () => console.log(`Server is running on ${port}`))