import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET || "somerandomkey", { expiresIn: '1d' })
}

export default createToken