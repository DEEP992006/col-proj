"use client"

import { UserallKnowledgeAction } from "@/Action/Knowledge"
import KnowledgeCard from "@/components/ui/knowledge/KnowledgeCard"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/footer"
import { useCurrentUser } from "@/hook/hook"
import type { TechItem } from "@/lib/tech-data"
import { useEffect, useState } from "react"
import Link from "next/link"

const UserKnowledgePage = () => {
  const [userknowledge, setUserKnowledge] = useState<TechItem[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { email } = useCurrentUser()

  const userAllKnowledge = async (email: string) => {
    setIsLoading(true)
    const userall = await UserallKnowledgeAction(email)
    setUserKnowledge(userall)
    setIsLoading(false)
  }

  useEffect(() => {
    if (email) {
      userAllKnowledge(email)
    }
  }, [email])

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-14">

        {/* Header Section - EXACT Explore page theme */}
        <div className="mb-14">
          <div className="flex items-center justify-between w-full">
            
            {/* Title Block */}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight 
                bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
                bg-clip-text text-transparent drop-shadow-lg">
                My Knowledge
              </h1>

              <p className="text-lg md:text-xl text-slate-300 mt-3 opacity-80">
                All your created knowledge in one place.
              </p>
            </div>

            {/* Add New Button */}
            <Link
              href="/new"
              className="px-6 py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-cyan-500 to-purple-600 
                shadow-lg shadow-cyan-500/20 hover:shadow-purple-600/20 
                hover:scale-105 transition-all duration-300"
            >
              + Add New
            </Link>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-slate-800"></div>
                <div className="p-5">
                  <div className="h-6 bg-slate-700 rounded mb-3"></div>
                  <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && (!userknowledge || userknowledge.length === 0) && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 
            bg-slate-900/30 rounded-xl border border-white/10 backdrop-blur-sm">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
              </svg>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-2">
              No knowledge items yet
            </h3>

            <p className="text-slate-400 mb-6">
              Create your first knowledge item to get started
            </p>

            <Link
              href="/new"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 
              text-white font-semibold shadow-lg hover:opacity-90 transition-all"
            >
              Create Knowledge
            </Link>
          </div>
        )}

        {/* User Knowledge Grid */}
        {!isLoading && userknowledge && userknowledge.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userknowledge.map((u) => (
              <KnowledgeCard
                key={u.id}
                id={u.id}
                img={u.img}
                name={u.name}
                desc={u.desc}
                email={u.email}
              />
            ))}
          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}

export default UserKnowledgePage
