import { getAIresponse, ResumeParse } from "../AIservices/ai.services.js"
import { argonHashPassword, CheckPassword, generateToken, GetAdminEmail, GetEmail, StoreAdminSignup, StoreSignup } from "../services/auth.services.js"

import { backendAvailableJobs, getBackDashboardData, getResumeStatData, GetShortlistData, StoreFormData, StoreResume } from "../services/getadminData.services.js"
import { CheckAts, Shortlist, Unshortlist } from "../services/GetAIData.services.js"



export const getJobInfo = async(req,res) => {

    const formInfo = await StoreFormData(req.body)
    console.log(formInfo)


}
export const JobList = async(req,res) => {

  console.log("req.user",req.user)

  if(!req.user){
    return res.status(400).json({message:"Please Login"})
  }
  

    const availabelJobs = await backendAvailableJobs()
    
    if(!availabelJobs){
        console.log("Jobs Not Availabel")
    }
    return res.json(availabelJobs)
}
export const AIResumeParser = async(req,res) => {

  console.log(req.user)

    try {
    console.log("👉 File from client:", req.file);  // Yaha file milegi
    const resumeData = await ResumeParse(req.file)
    // console.log("RD",resumeData)
    return res.json(resumeData)
      

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const StoreResumeDetail = async (req,res) => {

  
  // console.log(req.body)
  const {skills,description,jobId} = req.body
  // console.log(skills,description,jobId)
  const score = await CheckAts(skills,description,jobId)

  if(score > 73){
    Shortlist(req.body)

    
  }
  else{
    Unshortlist(req.body)
  }
  
  // const storeResumeBack = await StoreResume(req.body)
  // console.log(storeResumeBack)

}

export const SendAIResponse = async(req,res) => {
  // console.log(req.body)
  
  const data = await getAIresponse(req.body.message)
  return res.json(data)
}



export const CheckApply = (req,res) => {

  // console.log(req.user)

  if(!req.user){
    return res.status(404).json({message:"Please Login"})
  }
  return res.status(200).json({message:"Login Successful"})
}

export const AuthInterview = (req,res) => {

  console.log(req.user)
  if(!req.user){

    return res.status(404).json({message:"Please Login"})
  }
  return res.status(200).json({message: req.user})

}

export const ATSShortlist = async(req,res) => {

  console.log(req.body)

  const data = await GetShortlistData(req.body)
  
  if(!data){
    return res.status(400).json({message:"Data not Availabel"})
  }
  return res.status(200).json({message:data})

}

export const getResumeStat = async(req,res) => {

  console.log(req.body)
  const data = await getResumeStatData(req.body)
  console.log(data)
  if(!data)
  {
    return res.status(404).json({message:"Data not availabel"})
  }
  return res.status(200).json({message:data})
}

export const DashboardData = async(req,res) => {

  // console.log("req.user",req.user)
  if(!req.user){
    return res.status(400).json({message:"Please Login"})
  }
  const data = await getBackDashboardData()
  // console.log("asdasdasdas",data)
  return res.status(200).json({message:data})

}

export const PostAdminSignup = async(req,res) => {

 const {name,password,email} = req.body
 
    //  console.log(name,password,email)
     const hashPassword = await argonHashPassword(password)
 
     if(!hashPassword){
         return res.status(404).json({message:"Please Provide a password"})
     }
     const storeBack = await StoreAdminSignup(name,hashPassword,email)
 
     if(!storeBack){
         return res.status(404).json({message:"Not Register"})
     }
     return res.status(200).json({message:"Register Successful"})
}

export const PostAdminLogin = async(req,res) => {

  // console.log(req.body)

  const { email, password } = req.body;
  
      const user = await GetAdminEmail(email);
      if (!user) {
          return res.status(400).json({ message: "Email Not Exist" });
      }
  
      const CheckHashPassword = await CheckPassword(user.password, password);
      if (!CheckHashPassword) {
          return res.status(404).json({ message: "Something Wrong on Email and Password" });
      }
  
      const token = generateToken({
          id: user.id,
          name: user.name,
          email: user.email
      });
      
  
      // ✅ cookie config
      res.cookie("admin_token", token, {
          httpOnly: true,
          secure: false,  // must be false in local dev
          sameSite: "lax"
      });
  
      return res.status(200).json({ message: "Login Successful" });
}

export const getAuthInfo = async(req,res) => {

    console.log(req.user)

}