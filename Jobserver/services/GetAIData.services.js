import { eq } from "drizzle-orm"
import { db } from "../config/db.js"
import { jobs, resumes } from "../drizzle/schema.js"
import { CheckShortlisting } from "../AIservices/ATS.services.js"

export const getResumes = async(id) => {

    const result =  await db.select().from(resumes).where(eq(id,id))
    return result
    

}

export const CheckAts = async(skills,description,job) => {

    console.log(skills,description,job)

    const [jobDetail] = await db.select().from(jobs).where(eq(job,jobs.id))
    // console.log(jobDetail)

    const atsScore = await CheckShortlisting(jobDetail,skills,description)
    // console.log(atsScore)

    return atsScore

    
}

export const Shortlist = async(data) => {

    const {name,jobId,links,email,phone,description,skills} = data
    const result = await db.insert(resumes).values({name,jobId,links,email,phone,description,skills,status:"shortlisted"})
    // console.log(result)

}

export const Unshortlist = async(data) => {

    const {name,jobId,links,email,phone,description,skills} = data
    const result = await db.insert(resumes).values({name,jobId,links,email,phone,description,skills,status:"notshortlisted"})
    // console.log(result)
}