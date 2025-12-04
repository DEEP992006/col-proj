"use client"

import type { TechItem } from "@/lib/tech-data"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SingleKnowledgeAction } from "@/Action/Knowledge"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

// Icons
import { Book, User, FileText } from "lucide-react"

const Page = () => {
  const [getsingleTech, setGetsingleTech] = useState<TechItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    if (id) singletech(Number(id))
  }, [id])

  const singletech = async (id: number) => {
    setIsLoading(true)
    try {
      const data: TechItem = await SingleKnowledgeAction(id)
      setGetsingleTech(data || null)
    } finally {
      setIsLoading(false)
    }
  }

  // LOADING UI
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <main className="min-h-[60vh] flex items-center justify-center bg-black">
          <div className="animate-pulse w-72 space-y-4">
            <div className="h-6 bg-slate-800 rounded"></div>
            <div className="h-6 bg-slate-800 rounded w-1/2"></div>
            <div className="h-48 bg-slate-800 rounded-xl"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // NOT FOUND
  if (!getsingleTech) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-black">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Knowledge Not Found
          </h1>
          <p className="text-slate-300 mb-6 mt-2">This knowledge item does not exist.</p>

          <Link
            href="/knowledge"
            className="px-5 py-2 rounded-xl bg-slate-900/50 border border-white/10 hover:bg-white/10 transition"
          >
            Back to Explore
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  // MAIN PAGE
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="px-4 md:px-10 py-12 bg-black min-h-screen">

        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/knowledge"
            className="text-sm flex items-center gap-1 group"
          >
            <span
              className="text-slate-300 transition-all group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent"
            >
              ← Back to Explore
            </span>
          </Link>
        </div>

        {/* CARD */}
        <div className="max-w-3xl mx-auto">

          <Card
            className="
              rounded-3xl 
              bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-black/40 
              backdrop-blur-xl 
              border border-white/10 
              shadow-[0_0_35px_rgba(0,0,0,0.7)]
              transition-all
              overflow-hidden
            "
          >
            <CardHeader className="border-b border-white/10 pb-8 pt-8 text-center">
              <CardTitle
                className="
                  text-4xl 
                  font-extrabold 
                  tracking-wide 
                  bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
                  bg-clip-text 
                  text-transparent
                "
              >
                Knowledge Details
              </CardTitle>
            </CardHeader>

            <CardContent className="p-10 flex flex-col gap-10">

              {/* IMAGE — fully visible, responsive */}
              <div className="flex justify-center">
                <img
                  src={getsingleTech.img}
                  alt={getsingleTech.name}
                  className="max-w-full max-h-80 object-contain rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                />
              </div>

              {/* TITLE */}
              <div className="space-y-3 p-5 rounded-xl bg-slate-900/20 border border-white/10">
                <p className="text-2xl font-bold text-white">{getsingleTech.name}</p>
              

              {/* DESCRIPTION */}
             

                <p className="text-slate-300 whitespace-pre-line leading-relaxed">
                  {getsingleTech.desc}
                </p>
              </div>

              {/* AUTHOR */}
              <div className="space-y-3 p-5 rounded-xl bg-slate-900/20 border border-white/10">
                <p className="text-lg text-white">{getsingleTech.email}</p>
              </div>

            </CardContent>
          </Card>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Page
