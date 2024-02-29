import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to mongoDB')
    })
    .catch((err) => {
        console.log(err)
    })

const app = express()

const port = 3000
app.listen(3000, () => console.log(`Server is running on ${port}`))