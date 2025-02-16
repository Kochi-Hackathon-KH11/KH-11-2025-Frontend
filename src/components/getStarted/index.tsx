import styles from './styles.module.css'
import { useRouter } from "next/navigation";

export default function GetStarted () {
    const router = useRouter();
    const handleRouteDemo = () => {
        router.push('demo');
    }
    const handleRouteLogin = () => {
        router.push('login');
    }
    return(
        <div className= {styles['get-started']}>
            <div className={styles['started-heading']}>Get started with ArticulateAI</div>
            <div className={styles['started-button-container']}>
                <button className={styles['started-button-demo']} onClick={handleRouteDemo}> Try Demo </button>
                {/* <button className={styles['started-button-start']}> Get Started</button> */}
                <div className={styles['started-button-start-outter'] } onClick = {handleRouteLogin}>
                    <div className={styles['started-button-start']}>
                        <div> Get Started</div>
                    </div>
                </div>
            </div>
        </div>
    )
}