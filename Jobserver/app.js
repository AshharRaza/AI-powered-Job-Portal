import express from 'express'
import cors from 'cors'
import { routes } from './routes/getData.routes.js'
import multer from 'multer'
import { authrouter } from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import { VerifyAuthorization } from './middleware/verify-auth-middleware.js'
import { VerifyAdminAuthorization } from './middleware/verify-authadmin-middleware.js'


const app = express()

const PORT = process.env.PORT

const corsOption = {
    origin : "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials : true
}




// app.use(express.urlencoded({extended:true}))
app.use(cors(corsOption))
app.use(express.json());
app.use(cookieParser())
app.use(authrouter)

app.use(VerifyAdminAuthorization)

app.use(VerifyAuthorization)

app.use(routes)







// app.post("/sendresume",)
// app.use(routes)
app.listen(PORT,() => {

    console.log(`Server is running at ${PORT}`)
})