'use client'

import { MCQ, newQuizAction } from '@/Action/QuizAction'
import { Header } from '@/components/ui/header'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

// -----------------------------
// REUSABLE EXPLORE DROPDOWN
// -----------------------------
const ExploreDropdown = ({
    label,
    value,
    options,
    onChange,
}: {
    label: string
    value: string | number
    options: (string | number)[]
    onChange: (v: any) => void
}) => {
    const [open, setOpen] = useState(false)

    return (
        <div
            className="
            relative w-full 
            p-6 rounded-2xl
            bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
            border border-white/10 shadow-xl
        "
        >
            <label className="font-semibold text-lg text-cyan-300">{label}</label>

            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="
                w-full mt-2 flex items-center justify-between
                bg-black/40 border border-white/15
                text-white p-3 rounded-xl
                hover:border-cyan-400 transition
            "
            >
                <span>{value}</span>
                {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {open && (
                <div
                    className="
                    absolute left-0 right-0 mt-2 z-20 
                    bg-slate-900 rounded-xl border border-white/10 shadow-xl
                    overflow-hidden
                "
                >
                    {options.map((opt) => (
                        <div
                            key={opt}
                            onClick={() => {
                                onChange(opt)
                                setOpen(false)
                            }}
                            className="
                            px-4 py-3 cursor-pointer text-white
                            hover:bg-slate-800 hover:text-cyan-300 transition
                        "
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

const Page = () => {
    const [technology, setTechnology] = useState('')
    const [difficulty, setDifficulty] = useState('medium')
    const [questions, setQuestions] = useState<Omit<MCQ, 'id'>[]>([
        {
            questions: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            correctedAnswers: 0,
        },
    ])

    const router = useRouter()

    const handleCreateQuiz = async () => {
        router.push("/quiz")
    }

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                questions: '',
                option1: '',
                option2: '',
                option3: '',
                option4: '',
                correctedAnswers: 0,
            },
        ])
    }

    const updateQuestion = (
        index: number,
        field: keyof Omit<MCQ, 'id'>,
        value: string | number
    ) => {
        const newQuestions = [...questions]
        newQuestions[index] = { ...newQuestions[index], [field]: value }
        setQuestions(newQuestions)
    }

    const removeQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await newQuizAction(technology, difficulty, questions)
        alert('Quiz created!')
        setTechnology('')
        setDifficulty('medium')
        setQuestions([
            {
                questions: '',
                option1: '',
                option2: '',
                option3: '',
                option4: '',
                correctedAnswers: 0,
            },
        ])
    }

    return (
        <div className="min-h-screen bg-black text-white px-4 pb-10 ">
            <Header />
            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <h1
                    className="
                    text-5xl font-bold mt-10
                    bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400
                    bg-clip-text text-transparent
                "
                >
                    Create New Quiz
                </h1>

                <p className="text-slate-400 mt-2">
                    Add technology, difficulty, and multiple MCQs.
                </p>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-10 space-y-8"
                >
                    {/* TECHNOLOGY INPUT */}
                    <div
                        className="
                        p-6 rounded-2xl
                        bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
                        border border-white/10 shadow-xl
                    "
                    >
                        <label className="text-cyan-300 font-semibold text-lg">
                            Technology
                        </label>

                        <input
                            type="text"
                            placeholder="e.g., JavaScript, React, Python"
                            value={technology}
                            onChange={(e) => setTechnology(e.target.value)}
                            required
                            className="
                            w-full mt-2 p-3 rounded-xl bg-black/40
                            border border-white/15 text-white
                            focus:border-cyan-400 outline-none transition
                        "
                        />
                    </div>

                    {/* DIFFICULTY DROPDOWN */}
                    <ExploreDropdown
                        label="Difficulty"
                        value={difficulty}
                        options={['easy', 'medium', 'hard']}
                        onChange={(v) => setDifficulty(v)}
                    />

                    {/* QUESTIONS HEADER */}
                    <h2
                        className="
                        text-3xl font-bold 
                        bg-gradient-to-r from-cyan-300 to-purple-300
                        bg-clip-text text-transparent
                    "
                    >
                        Questions ({questions.length})
                    </h2>

                    {questions.map((q, index) => (
                        <div
                            key={index}
                            className="
                            p-6 rounded-2xl 
                            bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
                            border border-white/10 shadow-lg
                        "
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-cyan-300">
                                    Question {index + 1}
                                </h3>

                                {questions.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeQuestion(index)}
                                        className="
                                            px-4 py-2 rounded-lg text-sm 
                                            bg-red-500/20 border border-red-400/40 text-red-300
                                            hover:bg-red-500/30 transition
                                        "
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>

                            {/* INPUT FIELDS */}
                            <div className="space-y-4">
                                {[
                                    { label: 'Question Text', field: 'questions' },
                                    { label: 'Option 1', field: 'option1' },
                                    { label: 'Option 2', field: 'option2' },
                                    { label: 'Option 3', field: 'option3' },
                                    { label: 'Option 4', field: 'option4' },
                                ].map(({ label, field }) => (
                                    <div key={field}>
                                        <label className="text-slate-300">{label}:</label>
                                        <input
                                            type="text"
                                            placeholder={label}
                                            value={q[field as keyof Omit<MCQ, 'id'>] as string}
                                            onChange={(e) =>
                                                updateQuestion(index, field as any, e.target.value)
                                            }
                                            className="
                                                w-full mt-1 p-3 rounded-xl bg-black/40
                                                border border-white/15 text-white
                                                focus:border-cyan-400 outline-none transition
                                            "
                                            required
                                        />
                                    </div>
                                ))}

                                {/* CORRECT ANSWER DROPDOWN */}
                                <ExploreDropdown
                                    label="Correct Answer"
                                    value={q.correctedAnswers}
                                    options={[0, 1, 2, 3]}
                                    onChange={(v) =>
                                        updateQuestion(index, 'correctedAnswers', v)
                                    }
                                />
                            </div>
                        </div>
                    ))}

                    {/* ADD QUESTION BUTTON */}
                    <button
                        type="button"
                        onClick={addQuestion}
                        className="
                        w-full py-3 rounded-xl font-semibold 
                        bg-gradient-to-r from-cyan-500 to-purple-600
                        text-white shadow-lg hover:scale-105 transition
                    "
                    >
                        + Add Another Question
                    </button>

                    {/* SUBMIT BUTTON */}
                    <button
                        onClick={handleCreateQuiz}
                        type="submit"
                        className="
                        w-full py-3 rounded-xl font-semibold 
                        bg-gradient-to-r from-green-500 to-cyan-600
                        text-white shadow-lg hover:scale-105 transition
                    "
                    >
                        Create Quiz
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Page
