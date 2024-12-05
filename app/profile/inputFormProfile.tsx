interface InputFormProps {
    title: string
    styleInput: string
    placeholder: string
    onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeInputSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    name: string
    required?: boolean
    children?: React.ReactNode
}

export const InputFormProfile = ({ styleInput, placeholder, onChangeInput, name, required = false, title }: InputFormProps) => {
    return (
        <div className="flex w-full gap-4 items-center">
            <span className="text-gray-400 text-sm w-[50%]">{title}</span>
            <input className={styleInput} name={name} type="text" placeholder={placeholder} required={required} onChange={onChangeInput} />
        </div>
    )
}

export const InputFormProfileSelect = ({ styleInput, placeholder, onChangeInputSelect, name, required = false, title, children }: InputFormProps) => {
    return (
        <div className="flex items-center">
            <span className='text-gray-400 w-[57%] text-sm'>{title}</span>
            <select id="" className={styleInput} name={name} onChange={onChangeInputSelect}>
                {children}
            </select>
        </div>
    )
}
