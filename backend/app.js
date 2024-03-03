import createServer from './utils/server.js'
import dotenv from 'dotenv'

dotenv.config()

const app = createServer()

const port = 3000
app.listen(3000, () => console.log(`Server is running on ${port}`))