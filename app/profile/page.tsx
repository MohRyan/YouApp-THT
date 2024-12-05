'use client'
import FormProfile from "@/app/profile/formProfile"
import { getProfile } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export interface userProfileI {
    email?: string
    username?: string
    name?: string
    birthday?: string
    horoscope?: string
    height?: string
    weight?: string
    interests?: string[]
}

const Profile = () => {
    const router = useRouter()
    if (!localStorage.getItem('token')) {
        router.push('/')
    }
    const LogOut = () => {
        localStorage.removeItem('token')
        router.push('/')
    }
    const [image, setImage] = useState('')
    const [aboutToggle, setAboutToggle] = useState<boolean>(false)
    const [userProfile, setUserProfile] = useState<userProfileI>({
        email: '',
        username: '',
        name: '',
        birthday: '',
        horoscope: '',
        height: '',
        weight: '',
        interests: []
    })
    console.log("🚀 ~ Profile ~ userProfile:", userProfile)

    useEffect(() => {
        const profile = async () => {
            const profile = await getProfile()
            setUserProfile(profile.data)
        }
        profile()
    }, [])





    return (
        <div className="text-white pt-12 px1 example bg-primary h-full w-full space-y-3 rounded-xl overflow-y-auto">
            <div className="flex justify-between px-2" >
                <span className="cursor-pointer flex items-center gap-2" onClick={LogOut}><span className="arrow-back"></span> Log Out</span>
                <b className="mr-9">@{userProfile.username}</b>
                <span className="meatballs-menu"></span>
            </div>

            <div className="flex w-full h-full p-3 flex-col space-y-3">
                <div className={`flex w-full h-48 min-h-48 rounded-xl bg-secondary`} style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
                </div>
                <div className="flex w-full flex-col justify-between p-4 rounded-xl bg-third gap-4">
                    <div className="flex justify-between">
                        <b>About</b>
                        {!aboutToggle ?
                            <b onClick={() => setAboutToggle(true)} className="edit-filled"></b>
                            :
                            ""
                        }
                    </div>
                    <p className={`${aboutToggle ? 'hidden' : 'block'} pt-7`}>Add in your to help others know you better</p>
                    <div className={`${aboutToggle ? 'block' : 'hidden'}`}>
                        <FormProfile setImage={setImage} image={image} aboutToggle={aboutToggle} setAboutToggle={setAboutToggle} setUserProfile={setUserProfile} />
                    </div>
                </div>
                <div className="flex w-full flex-col justify-between p-4 min-h-32 rounded-xl bg-third h-32">
                    <div className="flex justify-between">
                        <b>Interest</b>
                        <b className="edit-filled"></b>
                    </div>
                    <p>Add in your interest to find a better match</p>
                </div>
            </div>

        </div>
    )
}

export default Profile