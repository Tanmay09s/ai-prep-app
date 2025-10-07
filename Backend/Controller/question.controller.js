import { GoogleGenerativeAI } from "@google/generative-ai";
import { Session } from "../models/session.model.js";
import { Question } from "../models/question.model.js";

const ai = new GoogleGenerativeAI(process.env.GEN_AI);

export const generateInterviewQuestion = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, sessionId } = req.body;

    const prompt = `
You are an interview question generator.
Return ONLY a valid JSON array. Do not include explanations, extra text, or formatting.

Example format:
[
  {"question": "What is React?", "answer": "React is a JS library for building UIs."}
]

Now generate 5 questions for a ${role} with ${experience} years experience.
Focus on topics: ${topicsToFocus}.
`;

    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);

    let rawText = result.response.text();
    rawText = rawText.replace(/```json|```/gi, "").trim();
    const match = rawText.match(/\[([\s\S]*?)\]/);
    if (match) rawText = match[0];

    let data;
    try {
      data = JSON.parse(rawText);
      // console.log("Parsed AI data:", data);
    } catch (err) {
      console.error("Failed to parse JSON:", rawText);
      return res.status(400).json({ message: "Invalid JSON from model" });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const createdQuestions = await Question.insertMany(
      data.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    // Agar session ke andar bhi questions ka reference chahiye:
    if (session.questions) {
      session.questions.push(...createdQuestions.map(q => q._id));
      await session.save();
    }

    return res.status(201).json({
      message: "Questions created successfully",
      
    });

  } catch (error) {
    console.error("Error in generateInterviewQuestion:", error);
   
  }
};


export const togglePinQuestion = async(req,res)=>{
    try {
        const question = await Question.findById(req.params.id)

        if(!question){
            return res.status(401).json({
                message:"Question not found"
            })
        }

        question.isPinned = !question.isPinned

        await question.save({ validateBeforeSave: false })
        
        return res.status(201).json({
            message:"Question pinned successfully",
            // question
        })
    } catch (error) {
        console.log(`this eror is coming from toggle PIn question, error->${error}`)
    }
}