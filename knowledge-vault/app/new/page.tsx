'use client'
import { TechItem } from '@/lib/tech-data'
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { NewKnowledgeAction } from '@/Action/Knowledge'
import { useRouter } from 'next/navigation'
import { useCurrentUser } from '@/hook/hook'
import { log } from 'console'

const page = () => {

  const router = useRouter()

  const {email} = useCurrentUser()

     const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TechItem>()

  const onsubmit = async (data:TechItem) => {
    const newdata = { ...data, email: email || "" }
    // console.log(newdata)
    await NewKnowledgeAction(newdata)
  }

  return (
    <div>
     
    <form onSubmit={handleSubmit(onsubmit)}>
      
      <Input {...register("name")} />
      {errors.name && <span>This field is required</span>}

      <Input {...register("desc", { required: true })} />
      {errors.desc && <span>This field is required</span>}

      <Input {...register("img", { required: true })} />
      {errors.img && <span>This field is required</span>}

      <Input onClick={()=>router.push("/knowledge")} type="submit" />
    </form>
    </div>
  )
}

export default page
