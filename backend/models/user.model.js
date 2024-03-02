import mongoose from "mongoose";
import validator from 'validator'
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true })

userSchema.statics.signup = async function (username, email, password) {
    // validate input fields
    if (!username || !email || !password) {
        throw Error("All fields must be filled")
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error(`Your password is not strong enough.\n
        Please make sure it meets the following criteria:\n
        At least 8 characters in length\n
        At least 1 lowercase letter\n
        At least 1 uppercase letter\n
        At least 1 number\n
        At least 1 symbol`)
    }

    const emailExists = await this.findOne({ email })
    if (emailExists) {
        throw Error("Email already in use.")
    }

    const usernameExists = await this.findOne({ username })
    if (usernameExists) {
        throw Error("Username already in use.")
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = this.create({
        username,
        email,
        password: hashedPassword
    })

    return newUser
}

userSchema.statics.signin = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcryptjs.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }
}

const User = mongoose.model('User', userSchema)

export default User