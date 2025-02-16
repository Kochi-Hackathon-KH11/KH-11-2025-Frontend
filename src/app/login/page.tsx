'use client'

import { loginUser } from "@/lib/auth"
import { ChangeEventHandler, EventHandler, FormEventHandler, useState } from "react"

const Page = () => {
    const [formData, setFormData] = useState<{
        username: string,
        password: string,
    }>({
        username: "",
        password: "",
    })


    const changeHandler: ChangeEventHandler<HTMLInputElement> = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const submitHandler: FormEventHandler = async (e) => {
        e.preventDefault();
        const jwt = await loginUser(formData.username, formData.password);
        console.log(jwt)
        localStorage.setItem('token', jwt);
    }

    return (
        <form onSubmit={submitHandler} className="w-full h-screen flex items-center justify-center flex-col text-black gap-2">
            <input name="username" type="text" value={formData.username} onChange={changeHandler} />
            <input name="password" type="password" value={formData.password} onChange={changeHandler} />

            <button type="submit"> Submit </button>
        </form>
    )
}

export default Page;