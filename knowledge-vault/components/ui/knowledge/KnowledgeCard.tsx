"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card"
import type { TechItem } from "@/lib/tech-data"
import { ArrowRight } from "lucide-react"

const KnowledgeCard = ({ id, img, name, desc }: TechItem) => {
  return (
    <a href={`/single/${id}`} className="block group h-full">
      <Card className="
        h-full w-full rounded-2xl 
        bg-linear-to-br from-slate-900 to-slate-800 
        border border-white/10 
        shadow-xl hover:shadow-2xl 
        hover:border-cyan-400/30 
        transition-all duration-300 
        overflow-hidden relative
        hover:-translate-y-2
      ">
        
        {/* Neon Hover Glow */}
        <div className="
          absolute inset-0 
          rounded-2xl 
          bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 
          opacity-0 group-hover:opacity-100 
          blur-xl transition-all duration-500 pointer-events-none
        "></div>

        {/* IMAGE */}
        <CardContent className="p-0 relative">
          <div className="
            h-52 w-full flex items-center justify-center 
            bg-linear-to-br from-slate-800/60 to-slate-900/60 
            overflow-hidden relative
          ">
            {/* Subtle radial pattern like Explore page */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 30%, rgba(168,85,247,0.4), transparent 60%)",
              }}
            />

            <img
              src={img || "/placeholder.svg"}
              alt={name}
              className="
                h-40 w-40 object-contain 
                transition-all duration-500 
                group-hover:scale-110 
                relative z-10
              "
            />

            {/* Top fade */}
            <div className="
              absolute inset-0 bg-gradient-to-t 
              from-black/40 via-transparent to-transparent 
            "></div>
          </div>
        </CardContent>

        {/* TEXT CONTENT */}
        <CardHeader className="p-6 pb-4">
          <CardTitle className="
            text-xl font-semibold text-white 
            transition-all duration-300 
            group-hover:text-transparent 
            group-hover:bg-linear-to-r 
            group-hover:from-cyan-300 
            group-hover:via-purple-300 
            group-hover:to-pink-300 
            group-hover:bg-clip-text
          ">
            {name}
          </CardTitle>

          <CardDescription className="
            text-slate-300 text-sm mt-2 line-clamp-2
          ">
            {desc}
          </CardDescription>
        </CardHeader>

        {/* BUTTON */}
        <div className="px-6 pb-6 pt-3 border-t border-white/10">
          <button className="
            w-full flex items-center justify-between 
            py-3 px-4 rounded-xl 
            bg-linear-to-r from-cyan-600/70 to-purple-700/70 
            text-white font-medium text-sm 
            border border-white/10 
            shadow-md hover:shadow-xl 
            hover:from-cyan-500 hover:to-purple-600 
            transition-all duration-300
          ">
            Explore Now
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Corner Glows */}
        <div className="
          absolute -top-5 -right-5 w-28 h-28 
          bg-cyan-500/20 blur-3xl rounded-full 
          opacity-0 group-hover:opacity-60 transition-all duration-500
        "></div>

        <div className="
          absolute -bottom-5 -left-5 w-28 h-28 
          bg-purple-500/20 blur-3xl rounded-full 
          opacity-0 group-hover:opacity-60 transition-all duration-500
        "></div>
      </Card>
    </a>
  )
}

export default KnowledgeCard
