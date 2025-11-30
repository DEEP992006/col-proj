'use client'
import { TechItem } from '@/lib/tech-data'
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from "@/components/ui/input"

const page = () => {

     const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TechItem>()

  const onsubmit = async (data:TechItem) => {
    console.log(data)
  }

  return (
    <div>
     
    <form onSubmit={handleSubmit(onsubmit)}>
      
      <Input  {...register("name")} />
      {errors.name && <span>This field is required</span>}

      <Input {...register("desc", { required: true })} />
      {errors.desc && <span>This field is required</span>}

      <Input {...register("img", { required: true })} />
      {errors.img && <span>This field is required</span>}

      <Input type="submit" />
    </form>
    </div>
  )
}

export default page
