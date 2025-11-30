'use client'
import { useCurrentUser } from '@/hook/hook'
import { getTechKnowledgeVault, TechItem } from '@/lib/tech-data'
import React, { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'
import KnowledgeCard from '@/components/ui/knowledge/KnowledgeCard'
import { AllKnowledgeAction } from '@/Action/Knowledge'

const page = () => {

    // Store knowledge in variable
    const [showknowledge, setShowknowledge] = useState<TechItem[] | null>(null)

    // Retrieved email from hook
    const { email } = useCurrentUser()

    // Retrieved id from params
    const { id } = useParams()

    // Run knowledge function when email is available
    useEffect(() => {
        if (email) {
            knowledge()
        }
    }, [email])

    // Fetch TechKnowledge data from backend
    const knowledge = async () => {
        const getknowledge = await AllKnowledgeAction()

        setShowknowledge(getknowledge)
        // console.log(getknowledge)
    }

    // Render knowledge cards in a grid layout
    return (
        <div>
            {showknowledge && showknowledge.map((k) =>
            // Call Knowledgecard from components
            <KnowledgeCard 
            key={k.id}
            id={k.id}
            img={k.img}
            name={k.name}
            desc={k.desc}
            />
            )}

        </div>
    )
}

export default page
