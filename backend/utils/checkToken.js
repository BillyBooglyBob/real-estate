import jwt from "jsonwebtoken"

export function checkToken(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        throw Error('Unauthorised')
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            throw Error('Forbidden')
        }
        
        req.user = user
        next()
    })
}