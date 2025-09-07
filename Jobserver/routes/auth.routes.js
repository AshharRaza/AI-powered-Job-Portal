import {Router} from 'express'
import {  PostLogin, PostSignUp } from '../controllers/auth.controllers.js'
import { VerifyAuthorization } from '../middleware/verify-auth-middleware.js'
import { getAuthInfo, PostAdminLogin, PostAdminSignup } from '../controllers/getData.controllers.js'

const authroute = Router()

authroute.post("/signup",PostSignUp)
authroute.post("/login",PostLogin)
authroute.post("/adminsignup",PostAdminSignup)
authroute.post("/adminlogin",PostAdminLogin)
authroute.get("/auth",getAuthInfo)

// authroute.get("/checkJobauth",CheckJobs)


export const authrouter = authroute