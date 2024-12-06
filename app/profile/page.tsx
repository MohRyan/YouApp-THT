'use client';
import FormProfile from "@/app/profile/formProfile";
import { getProfile } from "@/lib/api";
import { listHoroskop } from "@/lib/horoskop";
import { listZodiac } from "@/lib/zodiac";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface userProfileI {
    email?: string;
    username?: string;
    name?: string;
    birthday?: string;
    horoscope?: string;
    height?: number;
    weight?: number;
    interests?: string[];
}

export interface dataNoApiI {
    horoscope: string;
    zodiac: string;
    gender: string;
}

const Profile = () => {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
            } else {
                router.push('/'); // Redirect to login
            }
        }
    }, [router]);

    const LogOut = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token'); // Hapus token dari localStorage
            router.push('/'); // Redirect ke halaman home
        }
    };

    const [image, setImage] = useState('');
    const [aboutToggle, setAboutToggle] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<userProfileI>({
        email: '',
        username: '',
        name: '',
        birthday: '',
        horoscope: '',
        height: undefined,
        weight: undefined,
        interests: []
    });

    const age = userProfile.birthday ? new Date().getFullYear() - new Date(userProfile.birthday).getFullYear() : 0;
    const [dataNoApi, setDataNoApi] = useState<dataNoApiI>({
        horoscope: '',
        zodiac: '',
        gender: '',
    });


    const profile = async () => {
        const profile = await getProfile(token!);
        setUserProfile(profile.data);
    };
    useEffect(() => {
        profile();
    }, []);

    return (
        <div className="text-white pt-12 px-1 example bg-primary h-full w-full space-y-3 rounded-xl overflow-y-auto">
            <div className="flex justify-between px-2" >
                <span className="cursor-pointer flex items-center gap-2" onClick={LogOut}><span className="arrow-back"></span> Log Out</span>
                <b className="mr-9">@{userProfile.username}</b>
                <span className="meatballs-menu"></span>
            </div>

            <div className="flex w-full h-full p-3 flex-col space-y-3">
                <div className={`flex w-full h-48 min-h-48 rounded-xl bg-secondary relative`} style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
                    <div className="flex flex-col w-full h-full justify-end items-start p-2 z-10">
                        <b className="">@{userProfile.username} {age > 0 ? `, ${age}` : ''}</b>
                        {dataNoApi.gender &&
                            <b>{dataNoApi.gender}</b>
                        }
                        {dataNoApi.horoscope || dataNoApi.zodiac ?
                            <div className="flex gap-3 items-center mt-2">
                                <b className={`flex gap-3 text-sm py-2 px-3 items-center rounded-xl ${dataNoApi.horoscope ? 'bg-white/20 backdrop-blur-sm' : ""}`}>{listHoroskop.find(horoskop => horoskop.title === dataNoApi.horoscope)?.icon} {dataNoApi.horoscope}</b>
                                <b className={`flex gap-3 text-sm py-2 px-3 items-center rounded-xl ${dataNoApi.zodiac ? 'bg-white/20 backdrop-blur-sm' : ""}`}> {listZodiac.find(zodiac => zodiac.title === dataNoApi.zodiac)?.icon} {dataNoApi.zodiac}</b>
                            </div>
                            : ""}
                    </div>
                    <div className="h-full absolute bottom-0 w-full bg-gradient-to-t z-0 from-black to-transparent"></div>
                </div>
                <div className="flex w-full flex-col justify-between p-4 rounded-xl bg-third gap-4">
                    <div className="flex justify-between">
                        <b>About</b>
                        {!aboutToggle ?
                            <b onClick={() => setAboutToggle(true)} className="edit-filled cursor-pointer"></b>
                            : ""
                        }
                    </div>
                    {
                        userProfile.name && !aboutToggle ?
                            <div className="flex flex-col gap-3">
                                <span className="text-gray-400 text-sm flex gap-2">Name: <p className="text-white">{userProfile.name}</p></span>
                                <span className="text-gray-400 text-sm flex gap-2">Birthday: <p className="text-white">{userProfile.birthday} {`( Age ${age || '-'})`}</p></span>
                                <span className="text-gray-400 text-sm flex gap-2">Horoscope: <p className="text-white">{dataNoApi.horoscope}</p></span>
                                <span className="text-gray-400 text-sm flex gap-2">Zodiac: <p className="text-white">{dataNoApi.zodiac}</p></span>
                                <span className="text-gray-400 text-sm flex gap-2">Height: <p className="text-white">{userProfile.height}</p></span>
                                <span className="text-gray-400 text-sm flex gap-2">Weight: <p className="text-white">{userProfile.weight}</p></span>
                            </div>
                            :
                            <p className={`${aboutToggle ? 'hidden' : 'block'} pt-7`}>Add in your to help others know you better</p>
                    }
                    <div className={`${aboutToggle ? 'block' : 'hidden'}`}>
                        <FormProfile setImage={setImage} image={image} aboutToggle={aboutToggle} setAboutToggle={setAboutToggle} setDataNoApi={setDataNoApi} profile={profile} userProfile={userProfile} token={token} />
                    </div>
                </div>
                <div className="flex w-full flex-col justify-between p-4 min-h-32 rounded-xl bg-third">
                    <div className="flex justify-between">
                        <b>Interest</b>
                        <b onClick={() => router.push('/profile/interest')} className="edit-filled cursor-pointer"></b>
                    </div>
                    {
                        userProfile.interests!.length > 0 ?
                            <div className="flex gap-3 flex-wrap w-full min-h-32">
                                <div className="flex gap-3 w-full flex-wrap py-3">
                                    {userProfile.interests!.map((interest, index) => (
                                        <span key={index} className="text-white text-sm px-4 py-2 h-9 bg-secondary rounded-xl">{interest}</span>
                                    ))}
                                </div>
                            </div>
                            :
                            <p>Add in your interest to find a better match</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Profile;