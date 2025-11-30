'use client'
import { useCurrentUser } from '@/hook/hook'
import { getTechKnowledgeVault, TechItem } from '@/lib/tech-data'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const page = () => {

    const [showknowledge, setShowknowledge] = useState<TechItem[] | null>(null)

    // Retrived email from youtube
    const { email } = useCurrentUser()
    // console.log(email)

    useEffect(() => {
        // If there is email knoelege function will run
        if (email) {
            knowledge()
        }
    }, [email])


    const knowledge = async () => {
        //Get TechKnowledge data from backend
        const getknowledge = await getTechKnowledgeVault(email || "")
        setShowknowledge(getknowledge)
    }
    return (
        <div>
            {showknowledge && showknowledge.map((k) =>
            <div key={k.id} className=''>
                <Card className='h-70 w-80' key={k.id}>
                    <CardContent>
                        <img className='h-20 w-20' src={k.img}/>
                    </CardContent>
                    <CardHeader>
                        <CardTitle>{k.name}</CardTitle>
                        <CardDescription>{k.desc}</CardDescription>
                    </CardHeader>
                </Card>
                </div>
            )}

        </div>
    )
}

export default page
