import styles from './styles.module.css'

export default function Hero() {
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
                    <button className={styles['hero-button-demo']}> Try Demo </button>
                    <button className={styles['hero-button-start']}> Start Using</button>
                </div>
            </div>
        </div>
    )
}