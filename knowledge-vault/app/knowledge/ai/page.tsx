'use client'
import { APIAction } from '@/Action/QuizAction'
import { Input } from '@/components/ui/input'
import { log } from 'console'
import React, { useState } from 'react'
import { useForm, Resolver } from "react-hook-form"

type FormValues = {
    title : string
}

const page = () => {

const [showContent, setshowContent] = useState<string|null>(null)

     const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>()

  const askAI = async (data:FormValues) => {
    // console.log(data.title)
    const ai = await APIAction(`write knowledge about ${data.title}`)
    setshowContent(ai || null);
    
  }
  return (
    <div>
       <form onSubmit={handleSubmit(askAI)}>
      <Input {...register("title")} placeholder="Ask To AI" />
      {errors?.title && <p>{errors.title.message}</p>}
      <input type="submit" />

      {showContent && 
      <p>{showContent}</p>
      }
    </form>
    </div>
  )
}

export default page