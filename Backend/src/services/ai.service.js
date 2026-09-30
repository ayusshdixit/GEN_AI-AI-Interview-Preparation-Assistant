// const { GoogleGenAI } = require("@google/genai");
// const { z } = require("zod")
// const { zodToJsonSchema } = require("zod-to-json-schema");

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY
// });

// const interviewReportSchema = z.object({
//     matchScore: z.number().describe("A score between 1 to 100 indicating how well the candidate's profile matches the description"),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question that can be asked in the interview"),
//         intention: z.string().describe("The intention of the interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take")
//     })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),

//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The behavioral question that can be asked in the interview"),
//         intention: z.string().describe("The intention of the interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take"),
//     })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),

//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important this skill is"),
//     })).describe("List of skill gaps in the candidate's profile with their severity"),

//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main topic or skill area to focus on this day"),
//         tasks: z.array(z.string()).describe("Specific, actionable tasks to complete this day"),
//     })).describe("A day-by-day preparation plan leading up to the interview, based on the identified skill gaps")
// })

// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
//     const prompt = `Generate an interview report for a candidate with the following details:
//     Resume: ${resume},
//     Self description: ${selfDescription},
//     Job Description: ${jobDescription}`

//     try {
//         const response = await ai.models.generateContent({
//             model: 'gemini-3-flash-preview',
//             contents: prompt,
//             config: {
//                 responseMimeType: "application/json",
//                 responseJsonSchema: zodToJsonSchema(interviewReportSchema)
//             }
//         })

//         return JSON.parse(response.text)
//     } catch (error) {
//     console.error("Gemini API Error:", error)
//     throw error
// }
// }

// module.exports = {generateInterviewReport};

// const { GoogleGenAI } = require("@google/genai");
// const { z } = require("zod")
// const { zodToJsonSchema } = require("zod-to-json-schema");

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY
// });

// const interviewReportSchema = z.object({
//     matchScore: z.number().describe("A score between 1 to 100 indicating how well the candidate's profile matches the description"),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question that can be asked in the interview"),
//         intention: z.string().describe("The intention of the interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take")
//     })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),

//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The behavioral question that can be asked in the interview"),
//         intention: z.string().describe("The intention of the interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take"),
//     })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),

//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important this skill is"),
//     })).describe("List of skill gaps in the candidate's profile with their severity"),

//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main topic or skill area to focus on this day"),
//         tasks: z.array(z.string()).describe("Specific, actionable tasks to complete this day"),
//     })).describe("A day-by-day preparation plan leading up to the interview, based on the identified skill gaps")
// })

// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
//     const prompt = `Generate an interview report for a candidate with the following details:
//     Resume: ${resume},
//     Self description: ${selfDescription},
//     Job Description: ${jobDescription}`

//     const rawSchema = zodToJsonSchema(interviewReportSchema)
//     delete rawSchema.$schema

//     try {
//         const response = await ai.models.generateContent({
//             model: 'gemini-3.8-flash',
//             contents: prompt,
//             config: {
//                 responseMimeType: "application/json",
//                 responseJsonSchema: rawSchema
//             }
//         })

//         return JSON.parse(response.text)
//     } catch (error) {
//         console.error("Gemini API Error:", error)
//         throw error
//     }
// }

// module.exports = { generateInterviewReport }

// 

const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

// Model is configurable so you can switch when a model's free daily quota runs out
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3-flash-preview"

// Retries temporary Gemini failures (503 overloaded, 500, 504) so users don't have to click again.
// A 429 (daily quota used up) is NOT retried, because waiting a few seconds won't fix it.
async function generateWithRetry(params, retries = 3) {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            return await ai.models.generateContent(params)
        } catch (err) {
            const status = err.status ?? err.code ?? Number((err.message || "").match(/"code":\s*(\d+)/)?.[1])
            const retryable = [500, 503, 504].includes(status)
            if (!retryable || attempt === retries) throw err
            const wait = 2000 * 2 ** attempt
            console.log(`Gemini returned ${status}, retrying in ${wait / 1000}s (attempt ${attempt + 1}/${retries})`)
            await new Promise(resolve => setTimeout(resolve, wait))
        }
    }
}

// Zod 4 has a built-in JSON Schema converter (zod-to-json-schema returns an empty schema for Zod 4)
function toJsonSchema(schema) {
    const jsonSchema = z.toJSONSchema(schema)
    delete jsonSchema.$schema
    return jsonSchema
}


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


    const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
`

    const response = await generateWithRetry({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: toJsonSchema(interviewReportSchema),
        }
    })

    return JSON.parse(response.text)


}



async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] })
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `

    const response = await generateWithRetry({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: toJsonSchema(resumePdfSchema),
        }
    })


    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}

module.exports = { generateInterviewReport, generateResumePdf }