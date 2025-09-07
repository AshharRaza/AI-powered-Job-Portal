import argon2 from 'argon2'
import { db } from '../config/db.js'
import { users, usersAdmin } from '../drizzle/schema.js'
import { eq } from 'drizzle-orm'
import jwt from "jsonwebtoken"

export const argonHashPassword = async(password) => {

    return await argon2.hash(password)
    

}
export const StoreSignup = async(name,password,email) => {

    // console.log(name,password,email)
    return await db.insert(users).values({name,password,email})
}

export const CheckPassword = async(hashPassword,password) => {

    const hash = await argon2.verify(hashPassword,password)
    return hash
}
export const GetEmail = async(email) => {
    // console.log(email)

    const [result]  = await db.select().from(users).where(eq(users.email,email))
    return result
}
export const GetAdminEmail = async(email) => {
    // console.log(email)

    const [result]  = await db.select().from(usersAdmin).where(eq(usersAdmin.email,email))
    return result
}

export const generateToken = ({id,name,email}) => {

    // console.log("tokenacasdd",id,name,email)

    return jwt.sign({id,name,email},process.env.JWT_SECRET,{
        expiresIn:"15d"
    })
}

export const verifyToken = (token) => {

    return jwt.verify(token,process.env.JWT_SECRET)
}

export const StoreAdminSignup = async(name,password,email) => {

//   console.log(name,email,password)
   return await db.insert(usersAdmin).values({name,password,email})
}