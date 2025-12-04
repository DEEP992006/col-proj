"use client"
import type { TechItem } from "@/lib/tech-data"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SingleKnowledgeAction } from "@/Action/Knowledge"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

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

  /* ------------ LOADING --------------- */
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

  /* ------------ NOT FOUND --------------- */
  if (!getsingleTech) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-black">
          <h1 className="text-3xl font-bold bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Knowledge Not Found
          </h1>
          <p className="text-slate-300 mb-6 mt-2">
            The knowledge item you're looking for doesn't exist.
          </p>

          <Link
            href="/knowledge"
            className="px-5 py-2 rounded-xl bg-slate-900/50 border border-white/10 text-white hover:bg-white/10 transition"
          >
            Back to Explore
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  /* ------------ MAIN PAGE --------------- */
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="px-4 md:px-10 py-12 bg-black min-h-screen">
        
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/knowledge"
            className="text-sm text-slate-300 hover:text-white transition"
          >
            ← Back to Explore
          </Link>
        </div>

        {/* Card Container */}
        <div className="max-w-5xl mx-auto">
          <Card className="rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-white/10 shadow-lg hover:shadow-xl transition">
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-3xl font-bold bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Knowledge Details
              </CardTitle>
            </CardHeader>

            <CardContent className="grid md:grid-cols-2 gap-10 py-10">

              {/* IMAGE */}
              <div className="flex justify-center">
                <img
                  src={getsingleTech.img}
                  alt={getsingleTech.name}
                  className="w-full h-64 object-cover rounded-xl border border-white/10 hover:scale-[1.02] transition"
                />
              </div>

              {/* DETAILS */}
              <div className="space-y-6 text-white">

                <div>
                  <p className="text-sm uppercase font-medium text-slate-400">Title</p>
                  <p className="text-xl font-semibold">{getsingleTech.name}</p>
                </div>

                <div>
                  <p className="text-sm uppercase font-medium text-slate-400">Author</p>
                  <p className="text-lg">{getsingleTech.email}</p>
                </div>

                <div>
                  <p className="text-sm uppercase font-medium text-slate-400">Description</p>
                  <p className="text-slate-300 leading-relaxed">{getsingleTech.desc}</p>
                </div>

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
