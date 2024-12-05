'use client'
import { InputFormProfile, InputFormProfileSelect } from './inputFormProfile'
import { listHoroskop } from '@/lib/horoskop'
import { listZodiac } from '@/lib/zodiac'
import { userProfileI } from './page'
import { useState } from 'react'

interface formProfileProps {
    setImage: React.Dispatch<React.SetStateAction<string>>
    image: string
    aboutToggle: boolean
    setAboutToggle: React.Dispatch<React.SetStateAction<boolean>>
    setUserProfile: React.Dispatch<React.SetStateAction<userProfileI>>
}

const textGradient = 'font-serif bg-gradient-to-r from-[#94783E] from-10% via-[#F3EDA6] via-30% to-[#94783E] to-90% cursor-pointer bg-clip-text text-transparent'
const styleInputProfile = "w-full p-2 rounded-md bg-secondary border border-gray-400 text-right "
interface dataNoApiI {
    horoscope: string
    zodiac: string
    gender: string
}

const FormProfile = ({ setImage, image, aboutToggle, setAboutToggle, setUserProfile }: formProfileProps) => {
    const [dataNoApi, setDataNoApi] = useState<dataNoApiI>({
        horoscope: '',
        zodiac: '',
        gender: '',
    })
    console.log("🚀 ~ FormProfile ~ dataNoApi:", dataNoApi)

    const handleInputChangeProfileNoApi = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDataNoApi((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleInputChangeProfile = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserProfile((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    return (
        <form className='flex flex-col gap-4 relative' >
            {aboutToggle ?
                <button type='submit' className={`absolute right-0 -top-9 ${textGradient} font-bold`} onClick={() => setAboutToggle(false)}>Save & Update</button>
                : ""
            }
            <div className="flex items-center gap-2">
                <input type="file" id="profile" onChange={(e) => setImage(URL.createObjectURL(e.target.files![0]))} className="hidden" />
                <label htmlFor="profile" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }} className="w-20 h-20 cursor-pointer bg-secondary flex items-center justify-center rounded-2xl">
                    {image ?
                        ""
                        :
                        <b className='text-5xl font-serif bg-gradient-to-r from-[#94783E] from-10% via-[#F3EDA6] via-30% to-[#94783E] to-90% cursor-pointer bg-clip-text text-transparent'>+</b>
                    }
                </label>
                <span>Add image</span>
            </div>
            <div className="flex flex-col gap-4">
                <InputFormProfile styleInput={styleInputProfile} placeholder="Enter Name" onChangeInput={handleInputChangeProfile} name="name" required title="Display Name:" />

                <InputFormProfileSelect name='gender' styleInput={styleInputProfile} placeholder='Gender' onChangeInputSelect={handleInputChangeProfileNoApi} required title='Gender:' >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </InputFormProfileSelect>

                <div className="flex items-center">
                    <span className='text-gray-400 w-[57%] text-sm'>Birthday</span>
                    <input type="date" name='birthday' placeholder='MM DD YY' onChange={handleInputChangeProfile} className={styleInputProfile} />
                </div>

                <InputFormProfileSelect name='horoscope' styleInput={styleInputProfile} placeholder='--' onChangeInputSelect={handleInputChangeProfileNoApi} required title='Horoscope:' >
                    <option value="" >--</option>
                    {listHoroskop.map((item, index) => (
                        <option key={index} value={item.title}> {item.title}</option>
                    ))}
                </InputFormProfileSelect>

                <InputFormProfileSelect name='zodiac' styleInput={styleInputProfile} placeholder='--' onChangeInputSelect={handleInputChangeProfileNoApi} required title='Zodiac:' >
                    <option value="" >--</option>
                    {listZodiac.map((item, index) => (
                        <option key={index} value={item.title}> {item.title}</option>
                    ))}
                </InputFormProfileSelect>

                <InputFormProfile styleInput={styleInputProfile} placeholder="Add height" onChangeInput={handleInputChangeProfile} name="height" required title="Height:" />

                <InputFormProfile styleInput={styleInputProfile} placeholder="Add weight" onChangeInput={handleInputChangeProfile} name="weight" required title="Weight:" />
            </div>
        </form>
    )
}

export default FormProfile