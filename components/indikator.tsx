'use client'
import { useEffect, useState } from 'react'

const IndikatorAndroid = () => {
    const [hours, setHours] = useState<number>(new Date().getHours())
    const [minutes, setMinutes] = useState<number>(new Date().getMinutes())
    const [batteryLevel, setBatteryLevel] = useState<boolean>(false)

    useEffect(() => {
        const updateTime = () => {
            const currentTime = new Date()
            setHours(currentTime.getHours())
            setMinutes(currentTime.getMinutes())
        }

        // Update time immediately on mount
        updateTime()

        // Set interval to update time every 10 seconds
        const intervalId = setInterval(updateTime, 10000)

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId)
    }, []) // Hapus 'batteryLevel' dari array dependensi

    useEffect(() => {
        setBatteryLevel((prevBatteryLevel) => !prevBatteryLevel)
    }, [minutes])

    return (
        <div className='absolute z-30 top-0 flex justify-between w-full p-2'>
            <div className="text-white">
                <b>{`${hours}:${minutes < 10 ? '0' : ''}${minutes}`}</b>
            </div>
            <div className="text-white space-x-2 flex items-center">
                <b className='signal-fill'></b>
                <b className='wifi'></b>
                <b className={!batteryLevel ? 'battery-full' : 'battery-000'}></b>
            </div>
        </div>
    )
}

export default IndikatorAndroid
