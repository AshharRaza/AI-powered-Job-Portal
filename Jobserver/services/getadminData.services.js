import { and, eq, sql } from "drizzle-orm"
import { db } from "../config/db.js"
import { jobs, resumes, users } from "../drizzle/schema.js"

export const StoreFormData = async(data) => {

    const {title,company,description,jobType,salaryMax,salaryMin,requirements,location} = data
    // console.log(title,company,description,jobType,salaryMax,salaryMin,requirements,location)
    const result = await db.insert(jobs).values({
        title,company,description,location,job_type:jobType,salaryMin,salaryMax,requirements


    })
    // console.log(result)
}
export const backendAvailableJobs = async() => {

    const result =  await db.select().from(jobs)
    return result
}
export const StoreResume = async(data) => {

    const {name,jobId,links,email,phone,description,skills} = data
    const result = await db.insert(resumes).values({name,jobId,links,email,phone,description,skills})
    // console.log(result)
}

export const GetShortlistData = async(data) => {

    const {jobId,status} = data
    // console.log("data",jobId,status)

    if(status === "all"){
        const result = await db.select().from(resumes)
        return result
    }

    const result = await db.select().from(resumes).where(and(
        eq(Number(jobId),resumes.jobId),
        eq(status,resumes.status)
    ))
    // console.log(result)

    return result
}

export const getResumeStatData = async(data) => {

    const {jobId} = data
     const result = await db
    .select({
      status: resumes.status,
      count: sql`COUNT(*)`.as("count")
    })
    .from(resumes)
    .where(eq(resumes.jobId, Number(jobId)))
    .groupBy(resumes.status);
    const total = await db.select().from(resumes)

   const totalCount = await db
    .select({
      count: sql`COUNT(*)`.as("count")
    })
    .from(resumes);
        

    return {result,total,totalCount};

}

export const getBackDashboardData = async() => {

    const jobsCount  = await db
    .select({
      count: sql`COUNT(*)`.as("count")
    })
    .from(jobs);

    const resume = await db
    .select({
      count: sql`COUNT(*)`.as("count")
    })
    .from(resumes);

    const user = await db
    .select({
      count: sql`COUNT(*)`.as("count")
    })
    .from(users);

    return { resume,jobsCount,user}

}

