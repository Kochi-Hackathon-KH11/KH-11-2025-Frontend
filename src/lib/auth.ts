import axios from 'axios'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const loginUser = async (username: string, password: string) => {
    const response = await axios.post(`${backendUrl}/auth/login/`, {
        username, password,
    });

    return response.data.access;
}

export const registerUser = async (username: string, email: string, password: string) => {
    const response = await axios.post(`${backendUrl}/auth/register/`, {
        username, email, password,
    });

    return response.data.access;
}