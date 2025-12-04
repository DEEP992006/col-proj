"use client"

import { getQuizAction, Quiz } from "@/Action/QuizAction"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/footer"

const Page = () => {
  const [quizzes, setQuizzes] = useState<Quiz[] | null>(null)
  const router = useRouter()

  useEffect(() => {
    loadAllQuizzes()
  }, [])

  const loadAllQuizzes = async () => {
    const allQuiz = await getQuizAction()
    setQuizzes(allQuiz as Quiz[])
  }

  const handleQuizClick = (id: number) => {
    router.push(`/quiz/${id}`)
  }

  return (
    <div className="min-h-screen bg-black text-white px-4">
      <Header />

      <div className="max-w-7xl mx-auto relative">

        {/* ADD NEW QUIZZES BUTTON */}
        <button
          onClick={() => router.push("/newquiz")}
          className="
            absolute right-0 top-18
            px-6 py-3 rounded-xl font-semibold z-20
            bg-gradient-to-r from-purple-500 to-cyan-500
            text-white shadow-lg hover:scale-105 transition
            border border-white/10
          "
        >
          + Add New Quizzes
        </button>

        {/* HEADER SECTION */}
        <div className="mb-12 py-16">
          <h1
            className="
              text-5xl font-bold 
              bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
              bg-clip-text text-transparent
            "
          >
            Available Quizzes
          </h1>

          <p className="text-slate-300 text-xl mt-2">
            Choose a quiz to test your knowledge.
          </p>
        </div>

        {/* QUIZ LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes &&
            quizzes.map((q) => (
              <div
                key={q.id}
                onClick={() => handleQuizClick(q.id)}
                className="
                  group relative cursor-pointer
                  rounded-2xl overflow-hidden 
                  bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
                  border border-white/10 
                  shadow-xl transition-all duration-300
                  hover:shadow-2xl hover:border-cyan-400/30 hover:-translate-y-2
                "
              >
                {/* Glow Overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20
                    opacity-0 group-hover:opacity-100
                    blur-2xl transition-all duration-500 pointer-events-none
                  "
                ></div>

                <div className="p-6 relative">
                  <h2
                    className="
                      text-2xl font-semibold 
                      transition-all duration-300
                      group-hover:text-transparent
                      group-hover:bg-gradient-to-r 
                      group-hover:from-cyan-300 group-hover:via-purple-300 group-hover:to-pink-300
                      group-hover:bg-clip-text
                    "
                  >
                    {q.technology}
                  </h2>

                  <p className="text-slate-300 mt-4 text-sm">
                    <span className="text-slate-400">Difficulty: </span>
                    <span className="uppercase tracking-wide">
                      {q.difficulty}
                    </span>
                  </p>

                  <p className="mt-6 text-cyan-300 font-medium">
                    Click to start →
                  </p>
                </div>

                {/* Corner Glows */}
                <div
                  className="
                    absolute -top-6 -right-6 w-24 h-24 
                    bg-cyan-500/20 blur-3xl rounded-full 
                    opacity-0 group-hover:opacity-60 transition-all duration-500
                  "
                ></div>
                <div
                  className="
                    absolute -bottom-6 -left-6 w-24 h-24 
                    bg-purple-500/20 blur-3xl rounded-full 
                    opacity-0 group-hover:opacity-60 transition-all duration-500
                  "
                ></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Page
