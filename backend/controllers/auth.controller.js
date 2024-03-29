import User from '../models/user.model.js'
import createToken from '../utils/createToken.js'

export const signup = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const newUser = await User.signup(username, email, password)

        res.status(201).json({ email: email })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const newUser = await User.signin(email, password)

        const token = createToken(newUser._id)

        res
            .status(200)
            .cookie('token', token, { httpOnly: true })
            .json({ email: email })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const signout = async (req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).json('User has been logged out')
    } catch (error) {
        res.status(500).json({ error: 'Cannot log out' })
    }
}