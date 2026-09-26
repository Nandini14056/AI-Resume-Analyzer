import "dotenv/config";
import Groq from "groq-sdk";
import  parseAIResponse  from "../utils/parseAIResponse.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const analyzeResumeWithAI = async (resumeText) => {

  const prompt = `
    You are an expert ATS Resume Reviewer.

    Analyze the following resume and return ONLY valid JSON.

    Do not include markdown.
    Do not include explanation.
    Do not wrap the JSON inside \`\`\`.

    Return exactly this format:

    {
      atsScore: 85,
      overallScore: 82,
      strengths: [],
      weaknesses: [],
      technicalSkills: [],
      missingSkills: [],
      projectFeedback: [],
      experienceFeedback: [],
      educationFeedback: [],
      recommendations: [],
      recommendedRoles: []
    }

    Resume: ${resumeText}
  `;
  
  const completion = await groq.chat.completions.create({
    model: process.env.GROQ_MODEL,
    temperature: 0.2,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = completion.choices[0].message.content;
  
  return parseAIResponse(content);
}

export { analyzeResumeWithAI };