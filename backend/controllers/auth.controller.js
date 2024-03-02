import User from '../models/user.model.js'

export const signup = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const newUser = await User.signup(username, email, password)

        res.status(201).json({ email })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body
    
    try {
        res.status(201).json({email})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
