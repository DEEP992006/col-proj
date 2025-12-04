'use client'
import { APIAction } from '@/Action/QuizAction'
import { NewKnowledgeAction } from '@/Action/Knowledge'
import { Input } from '@/components/ui/input'
import { useCurrentUser } from '@/hook/hook'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/ui/header'
import { Footer } from '@/components/footer'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"

type FormValues = {
    title : string
    imgUrl: string
}

const page = () => {

const [showContent, setshowContent] = useState<string|null>(null)
const [currentTitle, setCurrentTitle] = useState<string>("")
const { email } = useCurrentUser()
const router = useRouter()

     const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const askAI = async (data:FormValues) => {
    await setCurrentTitle(data.title)
    const ai = await APIAction(`write knowledge about ${data.title}`)
    setshowContent(ai || null);
  }

  const saveToDatabase = async () => {
    if (!showContent || !currentTitle || !email) return
    
    const imgUrl = (document.getElementById('imgUrl') as HTMLInputElement)?.value
    
    // await NewKnowledgeAction({
    //   id: 0,
    //   name: currentTitle,
    //   desc: showContent,
    //   img: imgUrl,
    //   email: email
    // })
    router.push("/knowledge")
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      {/* Header Section */}
      <div className="py-14 border-b border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            
            <div className="w-14 h-14 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-lg shadow-cyan-500/10">
              <svg
                className="w-7 h-7 text-cyan-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
              </svg>
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r 
                from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Knowledge Generator
              </h1>
              <p className="mt-2 text-lg text-slate-300">
                Generate knowledge content powered by AI
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-14">
        <div className="max-w-3xl mx-auto px-4">

          {/* Form Card */}
          <div className="p-8 rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur-sm 
            shadow-lg hover:border-cyan-500/30 hover:shadow-cyan-500/20 transition-all duration-300">

            <form onSubmit={handleSubmit(askAI)} className="space-y-8">

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold mb-2 text-slate-200">
                  Topic / Title
                </label>
                <Input
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  placeholder="e.g., React Hooks Best Practices"
                  className="h-12 bg-slate-900/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-600/40"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-2">{errors.title.message}</p>
                )}
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="imgUrl" className="block text-sm font-semibold mb-2 text-slate-200">
                  Image URL
                </label>
                <Input
                  id="imgUrl"
                  {...register("imgUrl", { required: "Image URL is required" })}
                  placeholder="https://example.com/image.jpg"
                  className="h-12 bg-slate-900/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-600/40"
                />
                {errors.imgUrl && (
                  <p className="text-red-400 text-sm mt-2">{errors.imgUrl.message}</p>
                )}
              </div>

              {/* Generate Button */}
              <div className="pt-6 border-t border-white/10">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold 
                    bg-gradient-to-r from-cyan-500 to-purple-600 text-white
                    shadow-lg shadow-cyan-500/20 hover:shadow-purple-600/20
                    hover:scale-105 transition-all"
                >
                  Generate with AI
                </button>
              </div>

            </form>

            {/* AI Generated Content */}
            {showContent && (
              <div className="mt-8 space-y-6">
                <div className="p-6 rounded-xl border border-white/10 bg-slate-900/60">
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">{currentTitle}</h3>
                  <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{showContent}</p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={saveToDatabase}
                    className="flex-1 py-3 rounded-xl font-semibold 
                      bg-gradient-to-r from-cyan-500 to-purple-600 text-white
                      shadow-lg shadow-cyan-500/20 hover:shadow-purple-600/20
                      hover:scale-105 transition-all"
                  >
                    Add to Database
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push("/knowledge")}
                    className="flex-1 py-3 rounded-xl font-semibold 
                      bg-slate-800 text-slate-300 border border-white/10 
                      hover:bg-slate-700 hover:text-white hover:border-white/20 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default page