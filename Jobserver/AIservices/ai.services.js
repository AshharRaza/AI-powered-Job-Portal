import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import {PDFLoader} from '@langchain/community/document_loaders/fs/pdf'
import dotenv from 'dotenv'
import fs from 'fs'
import {StructuredOutputParser} from 'langchain/output_parsers'
import path from "path"
import {z} from 'zod'
import {ConversationSummaryMemory} from 'langchain/memory'
import {ConversationChain} from 'langchain/chains'
import { PromptTemplate } from "@langchain/core/prompts"

dotenv.config()


export const ResumeParse = async(file) => {

    const schemaModel = StructuredOutputParser.fromZodSchema(
  z.object({
    name: z.string().describe("Person Name"),
    skills: z.array(z.string()).describe("List of person skills"),
    email: z.string().describe("Person Email"),
    phone: z.string().describe("Person Phone number (can include +91 or dashes)"),
    links: z.array(z.string()).describe("List of social media or portfolio links"),
    description: z.string().describe("Short description about the person"),
  })
);

    const schema = schemaModel.getFormatInstructions()
    console.log("rp",file)
    
    const loader = new PDFLoader(`${file.path}`)
    const data = await loader.load()
    const joinData =  data.map((d) => d.pageContent).join("\n")
    console.log(joinData)

    const prompt = `Extract the Info 
    
    ${joinData}
    ${schema}
    
    `

    const model = new ChatGoogleGenerativeAI({
        model:'gemini-2.0-flash',
        apiKey:process.env.API_KEY 
    })

    const result  = await model.invoke(prompt)
    const output = await schemaModel.invoke(result)
    console.log(output)
    return output
}


export const getAIresponse = async(text) => {

  console.log(text)

    const model = new ChatGoogleGenerativeAI({
    model:'gemini-2.0-flash',
    apiKey:process.env.API_KEY,
    
  })

  const memory = new ConversationSummaryMemory({
    llm:model
  })

  const message = text
const interviewPrompt = PromptTemplate.fromTemplate(`
You are an Interview Job Assistant.
The candidate said: "{input}".
Based on the conversation summary: {history}
Ask the next interview question in one or two lines.
Do not give explanations, just ask the question.
`);

  const chain = new ConversationChain({
    llm:model,
    memory:memory,
    prompt :interviewPrompt,

 
})


  const result = await chain.call({input:message})
  console.log(result)
  return result.response
}

