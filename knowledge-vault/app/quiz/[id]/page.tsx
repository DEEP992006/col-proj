"use client"

import { QuizWithQuestions, SingleQuizAction } from "@/Action/QuizAction"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

const Page = () => {
  const [quiz, setQuiz] = useState<QuizWithQuestions | null>(null)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([])
  const [isScore, setIsScore] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    if (id) fetchQuiz(Number(id))
  }, [id])

  const fetchQuiz = async (id: number) => {
    const quizData = await SingleQuizAction(id)

    const safeDifficulty = ["easy", "medium", "hard"].includes(quizData.difficulty)
      ? quizData.difficulty
      : "easy"

    setQuiz({
      ...quizData,
      difficulty: safeDifficulty as "easy" | "medium" | "hard",
    })

    setSelectedAnswers(new Array(quizData.questions.length).fill(null))
  }

  const handleAnswerSelect = (qIndex: number, answerIndex: number) => {
    const updated = [...selectedAnswers]
    updated[qIndex] = answerIndex
    setSelectedAnswers(updated)
  }

  const handleSubmit = () => setIsScore(true)

  const handleReset = () => {
    setSelectedAnswers(new Array(quiz?.questions.length || 0).fill(null))
    setIsScore(false)
  }

  if (!quiz)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    )

  // ✅ FIXED: TypeScript-safe score calculation
  const score = selectedAnswers.reduce<number>((count, ans, i) => {
    const correctIndex = Number(quiz.questions[i].correctedAnswers)
    return ans !== null && ans === correctIndex ? count + 1 : count
  }, 0)

  const allAnswered = selectedAnswers.every((a) => a !== null)

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <Link href="/quiz" className="text-slate-300 hover:text-cyan-400 transition">
          ← Back to Quizzes
        </Link>

        <h1 className="text-5xl font-bold mt-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          {quiz.technology} Quiz
        </h1>

        <p className="text-slate-300 mt-2 text-lg">
          Difficulty: <span className="uppercase">{quiz.difficulty}</span>
        </p>

        {isScore && (
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-green-400/40 shadow-lg">
            <h2 className="text-3xl font-bold text-green-400">Your Results</h2>
            <p className="text-xl mt-2">
              Score:{" "}
              <span className="text-cyan-300 font-semibold">
                {score} / {quiz.questions.length}
              </span>
            </p>
            <p className="text-xl">
              Percentage:{" "}
              <span className="text-purple-300 font-semibold">
                {quiz.questions.length > 0 ? ((score / quiz.questions.length) * 100).toFixed(1) : "0"}%
              </span>
            </p>
          </div>
        )}

        <div className="mt-10">
          {quiz.questions.map((q, qIndex) => {
            const options = [q.option1, q.option2, q.option3, q.option4]
            const userAns = selectedAnswers[qIndex]
            const correct = Number(q.correctedAnswers)

            return (
              <div
                key={q.id}
                className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 shadow-lg"
              >
                <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                  Question {qIndex + 1}
                </h3>

                <p className="text-slate-300 mt-2">{q.questions}</p>

                <div className="mt-6 space-y-3">
                  {options.map((option, oIndex) => {
                    const isSelected = userAns === oIndex
                    const isCorrect = oIndex === correct

                    return (
                      <label
                        key={oIndex}
                        className={`
                          block p-4 rounded-xl cursor-pointer border transition-all
                          ${!isScore ? "hover:border-cyan-400/60 hover:bg-slate-800/60" : ""}
                          ${isSelected && !isScore ? "border-cyan-400 bg-slate-800/80 shadow-lg" : ""}
                          ${isScore && isCorrect ? "border-green-400 bg-green-500/10" : ""}
                          ${isScore && isSelected && !isCorrect ? "border-red-400 bg-red-500/10" : ""}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name={`q-${qIndex}`}
                            checked={isSelected}
                            onChange={() => handleAnswerSelect(qIndex, oIndex)}
                            disabled={isScore}
                            className="h-5 w-5 accent-cyan-400"
                          />
                          <span className="text-slate-200">{option}</span>
                          {isScore && isCorrect && (
                            <span className="text-green-400 ml-auto">✓ Correct</span>
                          )}
                          {isScore && isSelected && !isCorrect && (
                            <span className="text-red-400 ml-auto">✗ Wrong</span>
                          )}
                        </div>
                      </label>
                    )
                  })}
                </div>

                {isScore && userAns !== correct && (
                  <p className="text-red-400 mt-3">
                    Correct Answer: <span className="text-cyan-300">{options[correct]}</span>
                  </p>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex gap-4">
          {!isScore ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg transition-all ${
                !allAnswered ? "opacity-40 cursor-not-allowed" : "hover:scale-105"
              }`}
            >
              Submit Quiz ({selectedAnswers.filter((a) => a !== null).length} /{" "}
              {quiz.questions.length})
            </button>
          ) : (
            <>
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl font-semibold bg-slate-800 border border-cyan-500/30 text-cyan-300 hover:bg-slate-700 transition-all"
              >
                Try Again
              </button>
              <Link
                href="/quiz"
                className="px-6 py-3 rounded-xl font-semibold bg-slate-800 border border-purple-500/30 text-purple-300 hover:bg-slate-700 transition-all"
              >
                Back to Quizzes
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
