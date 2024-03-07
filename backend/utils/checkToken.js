import jwt from "jsonwebtoken"

export function checkToken(req, res, next) {
    const token = req.cookies.token

    console.log('checking token')
    if (!token) {
        throw Error('Unauthorised')
    }

    console.log('token', token)
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            console.log('forbidden access')
            throw Error('Forbidden')
        }
        
        req.user = user
        next()
    })
}