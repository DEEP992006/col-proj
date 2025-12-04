"use client"

import { Footer } from '@/components/footer'
import { Header } from '@/components/ui/header'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="min-h-screen bg-black text-white">
        
        {/* Hero Section */}
        <section className="pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-4">

            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-6xl font-bold bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 
              bg-clip-text text-transparent">
                Knowledge Vault
              </h1>

              <p className="mt-6 text-xl text-slate-300 leading-relaxed">
                Collect, store, and explore all your knowledge in one beautiful place.<br />
                Organize your ideas and insights effortlessly.
              </p>

              {/* Search Bar */}
              <div className="mt-8">
                <input
                  type="text"
                  placeholder="Search your knowledge..."
                  className="w-full md:w-2/3 mx-auto block px-6 py-4 rounded-xl bg-slate-900/50 
                  border border-white/10 placeholder-slate-400 text-white
                  focus:outline-none focus:border-cyan-500/50 backdrop-blur-sm transition"
                />
              </div>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-wrap justify-center gap-6">
                <Link
                  href="/knowledge"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 
                  transition font-semibold"
                >
                  Start Exploring
                </Link>

                <Link
                  href="/new"
                  className="px-8 py-4 rounded-xl bg-slate-900/60 border border-white/10 hover:bg-slate-900/80 
                  transition font-semibold backdrop-blur"
                >
                  Create First Knowledge
                </Link>
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">

              {[
                { title: "Explore Knowledge", desc: "Browse community insights", href: "/knowledge" },
                { title: "Take a Quiz", desc: "Test your skills with quizzes", href: "/quiz" },
                { title: "Add Knowledge", desc: "Share and save your ideas", href: "/new" },
                { title: "Add Quiz", desc: "Access your personal quiz", href: "/newquiz" }
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 backdrop-blur-sm 
                  hover:border-cyan-500/30 hover:bg-slate-900/70 transition"
                >
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 
                  bg-clip-text text-transparent">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-slate-400">{item.desc}</p>
                </Link>
              ))}
            </div>

          </div>
        </section>


        {/* Features Section */}
        <section className="py-24 bg-slate-900/20 border-t border-white/5 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4">

            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 
            bg-clip-text text-transparent">
              Why Choose Knowledge Vault?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">

              {[
                {
                  title: "Organize Beautifully",
                  desc: "Categorize your knowledge with tags, folders, and smart collections."
                },
                {
                  title: "Find Instantly",
                  desc: "Lightning-fast search to find exactly what you need in seconds."
                },
                {
                  title: "Never Forget",
                  desc: "Your knowledge is securely saved and always accessible."
                }
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="p-8 bg-slate-900/50 border border-white/10 rounded-2xl backdrop-blur-sm"
                >
                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 
                  bg-clip-text text-transparent">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-slate-300">{feature.desc}</p>
                </div>
              ))}

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
