'use client'

import { UserallKnowledgeAction } from '@/Action/Knowledge'
import KnowledgeCard from '@/components/ui/knowledge/KnowledgeCard'
import { useCurrentUser } from '@/hook/hook'
import { TechItem } from '@/lib/tech-data'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [userknowledge, setuserknowledge] = useState<TechItem[] | null>(null)
    const { email } = useCurrentUser()

    useEffect(() => {
        if (email) userallknowledge(email)
    }, [email])


    const userallknowledge = async (email: string) => {
        const userall = await UserallKnowledgeAction(email)
        setuserknowledge(userall)
    }

    return (
        <div>
            {userknowledge && userknowledge.map((u) =>
                <KnowledgeCard
                    key={u.id}
                    id={u.id}
                    img={u.img}
                    name={u.name}
                    desc={u.desc}
                />
            )}
        </div>
    )
}

export default page
