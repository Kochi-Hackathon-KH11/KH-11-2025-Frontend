'use client'

import { loginUser } from "@/lib/auth"
import styles from './styles.module.css'
import { useRouter } from "next/navigation";
import { ChangeEventHandler, EventHandler, FormEventHandler, useState } from "react"

const Page = () => {
    const router = useRouter();
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

    const handleGoBack = () => {
        router.push('/');
    }

    const handleGoLogin = () => {
        router.push('login');
    }

    return (
        <div className={styles['login']}>
            <form onSubmit={submitHandler} className={styles['login-div']}>
                <div className={styles['input-container']}>
                    <div className={styles['form-title']}> Sign up</div>
                    <div className={styles['form-input-container']}>
                        <div>Email <span className={styles['must']}>*</span></div>
                        <input name="username" type="text" value={formData.username} onChange={changeHandler} />
                    </div>
                    <div className={styles['form-input-container']}>
                        <div>Username <span className={styles['must']}>*</span></div>
                        <input name="username" type="text" value={formData.username} onChange={changeHandler} />
                    </div>
                    <div className={styles['form-input-container']}>
                        <div>Password <span className={styles['must']}>*</span></div>
                        <input name="password" type="password" value={formData.password} onChange={changeHandler} />
                    </div>
                </div>
                <div className={styles['login-button-container']}>
                    <button type="submit" className={styles['login-button']}> Sign up </button>
                    {/* <div className={styles['horizontal-bar']}></div> */}
                    <div className={styles['change-to-signup']} onClick={handleGoLogin}>Login</div>
                </div>
                <div className={styles['go-back']} onClick={handleGoBack}>go back</div>
            </form>
            <div className={styles['upper-wave']}>
                <img src='/hero-upper-wave.svg' alt = 'wave'></img>
            </div>
        </div>
    )
}

export default Page;