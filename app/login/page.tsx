'use client'
import { Input, InputWithIcon } from "@/components/input"
import { toastError, toastSuccess } from "@/components/toast"
import { BASE_URL } from "@/lib/api"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { Toaster } from "react-hot-toast"

export interface dataLoginProps {
    username?: string,
    email?: string,
    password: string
}

const Login = () => {
    const router = useRouter()
    const [nameInput, setNameInput] = useState<string>('username')
    const [dataLogin, setDataLogin] = useState<dataLoginProps>({
        username: '',
        email: '',
        password: ''
    })

    const isEmail = (input: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(input);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDataLogin((prev) => ({
            ...prev,
            [name]: value
        }));

        if (name === 'username' || name === 'email') {
            if (isEmail(value)) {
                setNameInput('email')
                setDataLogin((prev) => ({
                    ...prev,
                    username: '',
                }))
            } else {
                setNameInput('username')
                setDataLogin((prev) => ({
                    ...prev,
                    email: '',
                }))
            }
        }
    };

    const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await fetch(`${BASE_URL}api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataLogin)
            })

            const data = await res.json()
            localStorage.setItem('token', data.access_token)
        } catch (error) {
            toastError('Failed to Login!')
        } finally {
            toastSuccess('Successfully Login!')
            router.push('/profile')
        }
    }

    return (
        <div className="pt-12 px-1 text-white h-full">
            <b className="cursor-pointer  flex items-center gap-3" onClick={() => router.back()}><span className="arrow-back"></span> Back</b>

            <div className="flex flex-col gap-10 p-3 h-[70%] justify-center">
                <b className="text-3xl">Login</b>
                <form className="flex flex-col gap-6 " onSubmit={handleSubmitLogin}>
                    <Input required={true} name={nameInput} placeholder="Enter Username/Email" onChange={handleInputChange} />
                    <InputWithIcon required={true} name="password" onChange={handleInputChange} styleInput={'p-3 rounded-md bg-[#FFFFFF0F]'} placeholder="Enter Password" />
                    <button type="submit" className="bg-gradient-to-r mt-5 from-[#62CDCB] to-[#4599DB] p-3 rounded-md shadow-lg shadow-cyan-500/50 font-bold text-lg">Login</button>
                </form>
                <p className="text-center">No account? <b className="bg-gradient-to-r from-[#94783E] from-10% via-[#F3EDA6] via-30% to-[#94783E] to-90% cursor-pointer bg-clip-text text-transparent" onClick={() => router.push('/register')}>Register here</b></p>
            </div>
            <Toaster
                toastOptions={{
                    className: 'mt-32',
                    duration: 2000
                }}
                position="top-center"
            />
        </div>
    )
}

export default Login