'use server'

import { TechItem } from "@/lib/tech-data"
import { db } from ".."
import { knowledgeTable } from "@/db/schema"
import { eq } from "drizzle-orm"

// New knowledge
export const NewKnowledgeAction = async (data:TechItem) => {
    // console.log(data)
    const result = await db.insert(knowledgeTable).values(data)
    
    return true
}

// All knowledgeAction
export const AllKnowledgeAction = async ()=> { 
    const all =await db.select().from(knowledgeTable)
    // console.log(all)
    return all
}

// Single knowledge action
export const SingleKnowledgeAction = async (id:Number) => {
    // console.log(id)
    const single = await db.select().from(knowledgeTable).where(eq(knowledgeTable.id,Number(id)))
    // console.log(single)
    return single[0]
}

// User all knowledge
export const UserallKnowledgeAction = async (email:string) => {
    // console.log(email)
    const userall = await db.select().from(knowledgeTable).where(eq(knowledgeTable.email,email))
    // console.log(userall)
    return userall
}