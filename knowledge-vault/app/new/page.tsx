"use client"
import type { TechItem } from "@/lib/tech-data"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { NewKnowledgeAction } from "@/Action/Knowledge"
import { useRouter } from "next/navigation"
import { useCurrentUser } from "@/hook/hook"
import { Footer } from "@/components/footer"
import { Header } from "@/components/ui/header"

const AddKnowledgePage = () => {
  const router = useRouter()
  const { email } = useCurrentUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TechItem>()

  const onsubmit = async (data: TechItem) => {
    const newdata = { ...data, email: email || "" }
    await NewKnowledgeAction(newdata)
    router.push("/knowledge")
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      {/* Header Section - Explore Theme */}
      <div className="py-14 border-b border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            
            <div className="w-14 h-14 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-lg shadow-cyan-500/10">
              <svg
                className="w-7 h-7 text-cyan-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r 
                from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Add New Knowledge
              </h1>
              <p className="mt-2 text-lg text-slate-300">
                Share something valuable with the community
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

            <form onSubmit={handleSubmit(onsubmit)} className="space-y-8">

              {/* Title */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2 text-slate-200">
                  Knowledge Title
                </label>
                <Input
                  id="name"
                  {...register("name", { required: "Title is required" })}
                  placeholder="e.g., React Hooks Best Practices"
                  className="h-12 bg-slate-900/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-600/40"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-2">{errors.name.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="desc" className="block text-sm font-semibold mb-2 text-slate-200">
                  Short Description
                </label>
                <textarea
                  id="desc"
                  {...register("desc", { required: "Description is required" })}
                  placeholder="Provide a short summary..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl 
                    text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-600/40 resize-none"
                />
                {errors.desc && (
                  <p className="text-red-400 text-sm mt-2">{errors.desc.message}</p>
                )}
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="img" className="block text-sm font-semibold mb-2 text-slate-200">
                  Image URL
                </label>
                <Input
                  id="img"
                  {...register("img", { required: "Image URL is required" })}
                  placeholder="https://example.com/image.jpg"
                  className="h-12 bg-slate-900/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-600/40"
                />
                {errors.img && (
                  <p className="text-red-400 text-sm mt-2">{errors.img.message}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6 border-t border-white/10">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl font-semibold 
                    bg-gradient-to-r from-cyan-500 to-purple-600 text-white
                    shadow-lg shadow-cyan-500/20 hover:shadow-purple-600/20
                    hover:scale-105 transition-all"
                >
                  Publish Knowledge
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

            </form>
          </div>

          {/* Info Blocks */}
          <div className="mt-12 grid md:grid-cols-3 gap-5">

            <div className="p-4 rounded-xl border border-white/10 bg-slate-900/30
              hover:border-cyan-500/30 hover:shadow-cyan-500/10 transition-all">
              <h3 className="font-semibold text-slate-200">📝 Be Descriptive</h3>
              <p className="text-sm text-slate-400 mt-1">Write clear helpful details.</p>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-slate-900/30
              hover:border-cyan-500/30 hover:shadow-cyan-500/10 transition-all">
              <h3 className="font-semibold text-slate-200">🖼 Add Images</h3>
              <p className="text-sm text-slate-400 mt-1">Images make knowledge engaging.</p>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-slate-900/30
              hover:border-cyan-500/30 hover:shadow-cyan-500/10 transition-all">
              <h3 className="font-semibold text-slate-200">✨ Make It Valuable</h3>
              <p className="text-sm text-slate-400 mt-1">Share real insights that help others.</p>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AddKnowledgePage
