'use server'

import { questionTable, quizTable } from "@/db/schema";
import { db } from "..";
import { eq } from "drizzle-orm";
import { GoogleGenAI } from "@google/genai";

// MCQ Interface
export interface MCQ {
    id: number;
    questions: string;
    option1: string;
    option2: string,
    option3: string,
    option4: string
    correctedAnswers: number;
}

export interface Quiz {
    id: number;
    technology: string;
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizWithQuestions extends Quiz {
    questions: MCQ[];
}

// New Quiz with Questions without getting id from MCQ
export const newQuizAction = async (technology: string, difficulty: string, questions: Omit<MCQ, 'id'>[]) => {
    const [quiz] = await db.insert(quizTable).values({
        technology,
        difficulty
    }).returning()

    // New questions added using qquiz.id as foriegn key
    const questionsWithQuizId = questions.map(q => ({
        quizId: quiz.id,
        questions: q.questions,
        option1: q.option1,
        option2: q.option2,
        option3: q.option3,
        option4: q.option4,
        correctedAnswers: q.correctedAnswers
    }))

    // Insert new question into db
    await db.insert(questionTable).values(questionsWithQuizId)
    return true
}

//All Quiz
export const getQuizAction = async () => {
    const all = await db.select().from(quizTable)
    return all
}

// Single Quiz with all questions
export const SingleQuizAction = async (id: number) => {
    const quiz = await db.select().from(quizTable).where(eq(quizTable.id, Number(id)))
    // Clicking on a gives retrived all questions matching to the quiz.id in questionTable
    const questions = await db.select().from(questionTable).where(eq(questionTable.quizId, Number(id)))

    return {
        ...quiz[0],
        questions
    }
}

export const APIAction = async (prompt:string) => {
    const ai = new GoogleGenAI({});
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log(response.text);
  return response.text
}


