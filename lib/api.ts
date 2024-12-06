export const BASE_URL = "https://techtest.youapp.ai/"

export const getProfile = async (token: string) => {
    const res = await fetch(`${BASE_URL}api/getProfile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token!
        }
    })

    const data = await res.json()
    return data
}