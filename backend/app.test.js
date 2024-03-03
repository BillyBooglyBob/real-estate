import request from 'supertest'
import createServer from './utils/server'
import { jest } from '@jest/globals'
import User from './models/user.model'
import validator from 'validator'

const app = createServer()

// used by the createToken method for jwt encryption
process.env.SECRET = 'abcd'

describe('Real estate API', () => {
    describe('POST /sign-up', () => {
        // mock database function
        User.signup = jest.fn(async (username, email, password) => {
            // validate input fields
            if (!username || !email || !password) {
                throw Error("All fields must be filled")
            }

            if (!validator.isEmail(email)) {
                throw Error("Email is not valid")
            }

            if (!validator.isStrongPassword(password)) {
                throw Error(`Your password is not strong enough`)
            }

            const newUser = {
                _id: 12334
            }
            console.log(newUser._id)
            return newUser
        });

        it('return 201 status code and email when valid signup data inputted', async () => {
            const userData = {
                username: 'James',
                email: 'james@gmail.com',
                password: 'abcABC1/'
            }

            const res = await request(app)
                .post('/api/auth/sign-up')
                .send(userData)
            
            expect(res.status).toBe(201)
            expect(res.body).toEqual({ email: userData.email })
        })

        it('400 status code and throw error when invalid email inputted', async () => {
            const userData = {
                username: 'James',
                email: 'james',
                password: 'abcABC1/'
            }

            const res = await request(app)
                .post('/api/auth/sign-up')
                .send(userData)

            expect(res.status).toBe(400)
            expect(res.body).toEqual({ error: "Email is not valid" })
        })

        it('400 status code and throw error when weak password inputted', async () => {
            const userData = [
                {
                    username: 'James',
                    email: 'james@gmail.com',
                    password: 'abc'
                }, {
                    username: 'Bob',
                    email: 'bob@gmail.com',
                    password: 'ABC123'
                }, {
                    username: 'ajlksdjflsa',
                    email: 'slkdfas@gmail.com',
                    password: 'abcABC123'
                }]

            for (const user of userData) {
                const res = await request(app)
                    .post('/api/auth/sign-up')
                    .send(user)

                expect(res.status).toBe(400)
                expect(res.body).toEqual({ error: "Your password is not strong enough" })
            }

        })

        it('400 status code when email, username and/or password missing', async () => {
            const userData = [
                { username: 'bob' },
                { email: 'billy@gmail.com' },
                { password: 'abcABC1/' },
                {}
            ]

            for (const user of userData) {
                const res = await request(app).post('/api/auth/sign-up').send(user)
                expect(res.status).toBe(400)
                expect(res.body).toEqual({ error: "All fields must be filled" })
            }
        })
    })
})
