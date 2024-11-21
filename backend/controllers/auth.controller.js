import User from '../models/user.model.js'
import createToken from '../utils/createToken.js'

// Signup controller
export const signup = async (req, res) => {
    // Extract username, email, and password from the request body
    const { username, email, password } = req.body

    try {
        // Create a new user with the extracted details
        const newUser = await User.signup(username, email, password)

        res.status(201).json({ email: email })
    } catch (error) {
        // If there is an error, return a 400 status code with the error message
        res.status(400).json({ error: error.message })
    }
}

// Signin controller
export const signin = async (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body

    try {
        // Sign in the user with the extracted details
        const newUser = await User.signin(email, password)

        // Create a token with the user's id so the session can be maintained
        // and expire automatically after period of inactivity
        const token = createToken(newUser._id)

        res
            .status(200)
            .cookie('token', token, { httpOnly: true })
            .json({ email: email })
    } catch (error) {
        // If there is an error, return a 400 status code with the error message
        res.status(400).json({ error: error.message })
    }
}

// Signout controller
export const signout = async (req, res) => {
    try {
        // Clear the cookie with the token and log the user out
        res.clearCookie('token')
        res.status(200).json('User has been logged out')
    } catch (error) {
        // If there is an error, return a 500 status code with the error message
        res.status(500).json({ error: 'Cannot log out' })
    }
}