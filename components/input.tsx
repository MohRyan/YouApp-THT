'use client'
import { useState } from "react"
import { EmoteOffPassword, EmoteOnPassword } from "./SVG"

interface InputProps {
    styleInput: string
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string
    required?: boolean
}
interface InputWithIconProps {
    styleInput: string
    placeholder: string
    name: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean
}

export const Input = ({ styleInput, placeholder, onChange, name, required = false }: InputProps) => {
    return (
        <input className={styleInput} name={name} type="text" placeholder={placeholder} required={required} onChange={onChange} />
    )
}

export const InputWithIcon = ({ styleInput, placeholder, name, onChange, required = false }: InputWithIconProps) => {
    const [typePassword, setTypePassword] = useState<boolean>(false)

    return (
        <div className="relative w-full">
            <input name={name} className={`${styleInput} w-full`} required={required} onChange={onChange} type={typePassword ? "text" : "password"} placeholder={placeholder} />
            <span className={'absolute z-10 right-4 top-2 cursor-pointer'} onClick={() => setTypePassword(!typePassword)}>{typePassword ? <EmoteOnPassword /> : <EmoteOffPassword />}</span>
        </div>
    )
}