import styles from "./styles.module.css"
export default function Problem (){
    return(
        <div className={styles['problem']}>
            <div className={styles['problem-statement']}>
                <span className={styles['problem-statement-span']}>70+ million</span> people worldwide experience stuttering or other speech impediments.
            </div>
            <div className={styles['problem-impact']}>
                <div className={styles['impact-tag']}> Impact</div>
                <div className={styles['problem-statement-content']}>
                    Miscommunication and self-doubt often hinder individuals in personal, academic, and professional settings.
                </div>
            </div>
        </div>
    )
};