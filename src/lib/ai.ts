import { GoogleGenerativeAI } from '@google/generative-ai'

if (!import.meta.env.VITE_GEMINI_API_KEY) {
  throw new Error('Missing Gemini API Key')
}

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

// Create a model instance
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

export interface AIResponse {
  text: string
  sources?: string[]
  confidence?: number
}

export const generateStudyPlan = async (
  subject: string,
  topics: string[],
  duration: number
): Promise<AIResponse> => {
  try {
    const prompt = `Create a detailed study plan for ${subject} covering these topics: ${topics.join(
      ', '
    )} for a duration of ${duration} hours. Include specific time allocations and learning objectives.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return {
      text,
      confidence: 1,
    }
  } catch (error) {
    console.error('Error generating study plan:', error)
    throw error
  }
}

export const analyzePerformance = async (
  examScores: { subject: string; score: number }[],
  attendanceRate: number
): Promise<AIResponse> => {
  try {
    const prompt = `Analyze academic performance based on these exam scores: ${JSON.stringify(
      examScores
    )} and attendance rate of ${attendanceRate}%. Provide insights and recommendations for improvement.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return {
      text,
      confidence: 1,
    }
  } catch (error) {
    console.error('Error analyzing performance:', error)
    throw error
  }
}

export const getSubjectHelp = async (
  subject: string,
  topic: string,
  question: string
): Promise<AIResponse> => {
  try {
    const prompt = `Help with ${subject} - Topic: ${topic}. Question: ${question}. Provide a detailed explanation with examples.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return {
      text,
      confidence: 1,
    }
  } catch (error) {
    console.error('Error getting subject help:', error)
    throw error
  }
}

export const recommendResources = async (
  subject: string,
  topic: string,
  learningStyle: string
): Promise<AIResponse> => {
  try {
    const prompt = `Recommend learning resources for ${subject} - Topic: ${topic}, considering ${learningStyle} learning style. Include online courses, books, videos, and practice materials.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return {
      text,
      confidence: Number(response.candidates?.[0]?.safetyRatings?.[0]?.probability?.valueOf()) || 1,
    }
  } catch (error) {
    console.error('Error recommending resources:', error)
    throw error
  }
}

export default {
  generateStudyPlan,
  analyzePerformance,
  getSubjectHelp,
  recommendResources,
}
