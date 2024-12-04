'use client'
import { EmoteOffPassword, EmoteOnPassword } from "@/components/SVG"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const styleInput = 'p-3 rounded-md bg-[#FFFFFF0F]'

const Login = () => {
    const [typePassword, setTypePassword] = useState<boolean>(false)

    const router = useRouter()
    return (
        <div className=" py-5 text-white h-full">
            <b className="cursor-pointer  flex items-center gap-3" onClick={() => router.back()}><span className="arrow-back"></span> Back</b>

            <div className="flex flex-col gap-10 p-3 h-[70%] justify-center">
                <b className="text-3xl">Login</b>
                <form action="" className="flex flex-col gap-6 ">
                    <input className={styleInput} type="text" placeholder="Enter Username/Email" />
                    <div className="relative w-full">
                        <input className={`${styleInput} w-full`} type={typePassword ? "text" : "password"} placeholder="Enter Password" />
                        <span className={'absolute z-10 right-4 top-2 cursor-pointer'} onClick={() => setTypePassword(!typePassword)}>{typePassword ? <EmoteOnPassword /> : <EmoteOffPassword />}</span>
                    </div>
                    <button className="bg-gradient-to-r mt-5 from-[#62CDCB] to-[#4599DB] p-3 rounded-md shadow-lg shadow-cyan-500/50 font-bold text-lg">Login</button>
                </form>
                <p className="text-center">No account? <b className="bg-gradient-to-r from-[#94783E] from-10% via-[#F3EDA6] via-30% to-[#94783E] to-90% cursor-pointer underline bg-clip-text text-transparent" onClick={() => router.push('/register')}>Register here</b></p>
            </div>

        </div>
    )
}

export default Login