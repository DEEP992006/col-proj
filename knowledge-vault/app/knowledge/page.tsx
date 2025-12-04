"use client"

import { Header } from "@/components/ui/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import KnowledgeCard from "@/components/ui/knowledge/KnowledgeCard"
import { AllKnowledgeAction } from "@/Action/Knowledge"
import { useCurrentUser } from "@/hook/hook"
import type { TechItem } from "@/lib/tech-data"

const CATEGORIES = ["All", "React", "TypeScript", "CSS", "Performance", "Next.js", "Backend"]

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showknowledge, setShowknowledge] = useState<TechItem[]>([])
  const { email } = useCurrentUser()

  useEffect(() => {
    const fetchKnowledge = async () => {
      const getknowledge: TechItem[] = await AllKnowledgeAction()
      console.log("Fetched knowledge:", getknowledge)
      setShowknowledge(getknowledge)
    }
    fetchKnowledge()
  }, [email])

  const filteredItems = showknowledge.filter((item) => {
    const matchesCategory = selectedCategory === "All" || (item as any).category === selectedCategory
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <div className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">Explore Knowledge</h1>
            <p className="text-xl text-slate-300">Discover and browse all knowledge items from our community</p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search knowledge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-xl bg-slate-900/50 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
              />
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside className="w-64 shrink-0">
              <div className="sticky top-6 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        selectedCategory === category
                          ? "bg-linear-to-r from-cyan-500 to-purple-600 text-white font-semibold"
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Knowledge Grid */}
            <div className="flex-1">
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <KnowledgeCard
                      key={item.id}
                      id={item.id}
                      img={item.img}
                      name={item.name}
                      desc={item.desc}
                      email={item.email}
                    />
                  ))}
                </div>
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-20 bg-slate-900/30 rounded-xl border border-white/10 backdrop-blur-sm">
                  <p className="text-2xl font-semibold text-white mb-2">No knowledge items available yet</p>
                  <p className="text-slate-400">Start by adding your first knowledge item</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
