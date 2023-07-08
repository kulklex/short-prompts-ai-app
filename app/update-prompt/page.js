"use client"

import Form from '@/components/Form'
import React, { useState, useEffect } from 'react'
import {  useRouter, useSearchParams  } from 'next/navigation'



export default function EditPrompt() {
    
    const router = useRouter()
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })


    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)

            const data = await response.json()
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }

        if (promptId) getPromptDetails()
    }, [promptId])


    const editPrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        if(!promptId) return alert('Promot ID not found')

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if (response.ok) router.push(`/profile`)
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
        }
    }
    
    return (
    <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        setSubmitting={setSubmitting}
        handleSubmit={editPrompt}
    />
  )
}
