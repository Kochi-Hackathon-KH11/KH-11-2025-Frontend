import styles from './styles.module.css'

export default function GetStarted () {
    return(
        <div className= {styles['get-started']}>
            <div className={styles['started-heading']}>Get started with ArticulateAI</div>
            <div className={styles['started-button-container']}>
                <button className={styles['started-button-demo']}> Try Demo </button>
                {/* <button className={styles['started-button-start']}> Get Started</button> */}
                <div className={styles['started-button-start-outter']}>
                    <div className={styles['started-button-start']}>
                        <div> Get Started</div>
                    </div>
                </div>
            </div>
        </div>
    )
}