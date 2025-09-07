import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"
import dotenv from 'dotenv'


import CosineSimilarity from 'compute-cosine-similarity'

dotenv.config()


export const CheckShortlisting = async(jobDetail,skills,description) => {

    console.log("des",jobDetail.description)
    const embedding = new GoogleGenerativeAIEmbeddings({
        model:'text-embedding-004',
        apiKey:process.env.API_KEY
    })

   
  const [resumeDescEmbed, jobDescEmbed, resumeSkillsEmbed, jobReqEmbed] = await Promise.all([
    embedding.embedQuery(description),
    embedding.embedQuery(jobDetail.description),
    embedding.embedQuery(skills),
    embedding.embedQuery(jobDetail.requirements)
  ]);

  const descScore = CosineSimilarity(resumeDescEmbed, jobDescEmbed);
  const skillScore = CosineSimilarity(resumeSkillsEmbed, jobReqEmbed);

  const atsScore = ((descScore + skillScore) / 2) * 100;

  console.log(atsScore)
    // const desScore = CosineSimilarity(DesVector[0],)
  return atsScore
    

}