'use client'
import { Input, InputWithIcon } from "@/components/input"
import { useRouter } from "next/navigation"
import { dataLoginProps } from "../login/page"
import { FormEvent, useEffect, useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import { toastError, toastSuccess } from "@/components/toast"
import { BASE_URL } from "@/lib/api"


const Register = () => {
    const router = useRouter()
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [dataRegister, setDataRegister] = useState<dataLoginProps>({
        username: '',
        email: '',
        password: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDataRegister((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (dataRegister.password !== confirmPassword) return toastError('Password does not match!')

        try {
            await fetch(`${BASE_URL}api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataRegister)
            })
        } catch (error) {
            toastError('Failed to register!')
        } finally {
            toastSuccess('Successfully registered!')
            setTimeout(() => {
                router.push('/login')
            }, 2000);
        }
    }
    return (
        <div className=" py-5 text-white h-full pt-12 px-1">
            <b className="cursor-pointer  flex items-center gap-3" onClick={() => router.back()}><span className="arrow-back"></span> Back</b>

            <div className="flex flex-col gap-10 p-3 h-[90%] justify-center">
                <b className="text-3xl">Register</b>
                <form className="flex flex-col gap-6 " onSubmit={handleSubmitRegister}>
                    <Input name={'email'} placeholder="Enter Email" required={true} onChange={handleInputChange} />
                    <Input required={true} name={'username'} placeholder="Create Username" onChange={handleInputChange} />
                    <InputWithIcon name="password" required={true} onChange={handleInputChange} placeholder="Create Password" />
                    <InputWithIcon required={true} name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                    <span>{(confirmPassword && dataRegister.password) === "" ?
                        ""
                        : confirmPassword === dataRegister.password ?
                            <span className="text-green-500">Password match!</span>
                            : <span className="text-red-500">Password does not match!</span>}</span>
                    <button type="submit" className="bg-gradient-to-r mt-5 from-[#62CDCB] to-[#4599DB] p-3 rounded-md shadow-lg shadow-cyan-500/50 font-bold text-lg"> Register
                    </button>
                </form>
                <p className="text-center">Have an account? <b className="bg-gradient-to-r from-[#94783E] from-10% via-[#F3EDA6] via-30% to-[#94783E] to-90% cursor-pointer underline bg-clip-text text-transparent" onClick={() => router.push('/login')}>Login here</b></p>
                <Toaster
                    toastOptions={{
                        className: 'mt-32',
                        duration: 2000
                    }}
                    position="top-center"
                />
            </div>

        </div>
    )
}

export default Register