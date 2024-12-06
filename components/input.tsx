'use client'
import { useState } from "react"
import { EmoteOffPassword, EmoteOnPassword } from "./SVG"

interface InputProps {
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string
    required?: boolean
}
interface InputWithIconProps {
    styleInput?: string
    placeholder: string
    name: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean
}

export const Input = ({ placeholder, onChange, name, required = false }: InputProps) => {
    return (
        <input className={'p-3 rounded-md bg-[#FFFFFF0F]'} name={name} type="text" placeholder={placeholder} required={required} onChange={onChange} />
    )
}

export const InputWithIcon = ({ placeholder, name, onChange, required = false }: InputWithIconProps) => {
    const [typePassword, setTypePassword] = useState<boolean>(false)

    return (
        <div className="relative w-full">
            <input name={name} className={`p-3 rounded-md bg-[#FFFFFF0F] w-full`} required={required} onChange={onChange} type={typePassword ? "text" : "password"} placeholder={placeholder} />
            <span className={'absolute z-10 right-4 top-2 cursor-pointer'} onClick={() => setTypePassword(!typePassword)}>{typePassword ? <EmoteOnPassword /> : <EmoteOffPassword />}</span>
        </div>
    )
}