import express from 'express'
import { signin, signup, signout } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/sign-up', signup)
router.post('/sign-in', signin)
router.get('/sign-out', signout)

export default router