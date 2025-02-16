import FeatureCards from "../featureCard";
import styles from './styles.module.css'

export default function Future(){
    const data = [
        {
            imagePath : '/future-one.svg',
            title:"Your voice, just clearer.",
            description: "We are developing a feature to preserve the user’s natural voice, making conversations more personal and authentic."
        },
        {
            imagePath : '/future-two.svg',
            title:"Breaking language barriers for everyone.",
            description: "Expanding our AI model to support multiple languages, enabling users to enhance their speech fluency in their native tongue."
        },
        {
            imagePath : '/future-three.png',
            title:"Seamless speech enhancement for all phone calls.",
            description: "Soon, ArticulateAI will go beyond VoIP and integrate with standard mobile calls, ensuring fluency and clarity in every conversation."
        },
        {
            imagePath : '/future-four.svg',
            title:"Enhancing communication in virtual meetings.",
            description: "We plan to integrate with popular conferencing apps like Google Meet and Zoom, making professional and group conversations smoother and more accessible."
        },
    ]

    return (
        <div className={styles['future']}>
            <div className={styles['future-content']}>
                <div className={styles['future-heading']}>What’s Next for ArticulateAI?</div>
                <div className={styles['future-subheading']}>Expanding possibilities to make communication more seamless, natural, and inclusive.</div>
            </div>
            <div className={styles['future-card-container']}>
                {data.map((obj, indx) => (
                    <div key = {indx}>
                        <FeatureCards index={indx} imagePath={obj.imagePath} title={obj.title} description={obj.description} />
                    </div>
                ))}
            </div>
        </div>
    )
};