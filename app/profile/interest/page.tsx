'use client'
import TagsInput from '@/components/tags-input'
import { toastError } from '@/components/toast'
import { BASE_URL, getProfile } from '@/lib/api'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

const Interest = () => {
    const router = useRouter()
    const [tags, setTags] = useState<string[]>([]);
    const token = localStorage.getItem('token')



    const handleSaveInterest = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (tags.length > 0) {
            await fetch(`${BASE_URL}api/updateProfile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token!
                },
                body: JSON.stringify({ interests: tags })
            })
            router.push('/profile')
        } else {
            return toastError('Please enter your interest')
        }
    }
    return (
        <form className='pt-12 w-full h-full p-5 space-y-10 text-white' onSubmit={handleSaveInterest}>
            <div className="flex justify-between">
                <b className="cursor-pointer  flex items-center gap-3" onClick={() => router.back()}><span className="arrow-back"></span> Back</b>
                <button type='submit' className='text-blue-300'>Save</button>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className='bg-gradient-to-r from-[#94783E] from-10% via-[#F3EDA6] via-30% to-[#94783E] to-90% cursor-pointer bg-clip-text text-transparent'>Tell everyone about youself</h1>
                <h1 className='text-xl font-bold'>What interest you?</h1>
            </div>
            <TagsInput setTags={setTags} tags={tags} />
            <Toaster
                toastOptions={{
                    className: 'mt-16',
                    duration: 2000
                }}
                position="top-center"
            />
        </form>
    )
}

export default Interest