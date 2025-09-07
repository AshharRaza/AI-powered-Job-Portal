import { Router } from "express";
import { AIResumeParser, getJobInfo, JobList, StoreResumeDetail,SendAIResponse,  CheckApply, AuthInterview, ATSShortlist, getResumeStat, DashboardData } from "../controllers/getData.controllers.js";
import multer from "multer";
import path from "path";
// import { fileURLToPath } from "url";
import fs from "fs";
import { VerifyAuthorization } from "../middleware/verify-auth-middleware.js";
import { checkCandidateAuth, resumeAuth } from "../controllers/auth.controllers.js";


 const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save in uploads folder
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// ✅ Ensure uploads folder exists
const uploadDir = path.join("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const route = Router()




route.post("/forminfo",getJobInfo)
route.get("/joblist",JobList)
route.post("/sendresume",upload.single("resume"),AIResumeParser)
route.post('/resumedetail',StoreResumeDetail)
route.post("/airesponse",SendAIResponse)
route.get("/dashboard",DashboardData)

route.post("/atsshortlist",ATSShortlist)

route.get("/checkapply",CheckApply)
route.get("/authinterview",AuthInterview)
route.post("/resumeStats",getResumeStat)
route.get("/checkcandiatesauth",checkCandidateAuth)
route.get("/resumeStatsAuth",resumeAuth)


export const routes = route