import styles from './styles.module.css'
import { useRouter } from "next/navigation";

export default function Hero() {
    const router = useRouter();
    const handleRouteDemo = () => {
        router.push('demo');
    }
    const handleRouteLogin = () => {
        router.push('login');
    }
    return (
        <div className={styles['hero']}>
            <div className={styles['hero-content']}>
                <div className={styles['hero-subheading']}>Introducing</div>
                <div className={styles['hero-sparkle-container']}>
                    <img src='/hero-star.svg' alt = 'hero-star'></img>
                </div>
                <div className={styles['hero-heading']}>ArticulateAI</div>
                <div className={styles['hero-description']}>Real-time speech fluency enhancer for smoother communication.</div>
                <div className={styles['hero-button-container']}>
                    <button className={styles['hero-button-demo']} onClick={handleRouteDemo}> Try Demo </button>
                    {/* <button className={styles['hero-button-start']}> Get Started</button> */}
                    <div className={styles['hero-button-start-outter']} onClick = {handleRouteLogin}>
                        <div className={styles['hero-button-start']}>
                            <div> Get Started</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}