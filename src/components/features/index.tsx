import FeatureCards from '../featureCard';
import styles from './styles.module.css';

export default function Features (){
    const data = [
        {
            imagePath : '/feature-one.svg',
            title:"Real-Time Modulation",
            description: "Modulates speech fluency in real-time, ensuring smooth and natural communication."
        },
        {
            imagePath : '/feature-two.png',
            title:"Synthetic Output",
            description: "The tool uses an openly available voice model to provide clear and consistent speech output."
        },
        {
            imagePath : '/feature-three.svg',
            title:"Data Privacy",
            description: "Safeguards user data with secure processing, ensuring complete privacy and confidentiality."
        },
        {
            imagePath : '/feature-four.png',
            title:"Inclusive Accessibility",
            description: "Designed specifically to empower individuals with speech disabilities, fostering confidence and inclusivity in communication."
        },
        {
            imagePath : '/feature-five.png',
            title:"Integration for VoIP Calls",
            description: "App to seamlessly integrate our model with your mobile VoIP calls."
        },
    ]
    return(
        <div className={styles['feature']}>
            <div className={styles['feature-solution']}>
                <div className={styles['solution-title']}>Our Solution</div>
                <div className={styles['solution-description']}>Our app empowers individuals with speech disabilities by analyzing and interpreting disrupted speech patterns, such as stuttering or tics, to predict intended words and meaning. Using advanced voice analysis, it bridges communication gaps, allowing users to express themselves clearly and confidently in real time.</div>
            </div>
            {data.map((obj, indx) => (
                <div key = {indx}>
                    <FeatureCards index={indx} imagePath={obj.imagePath} title={obj.title} description={obj.description} />
                </div>
            ))}
        </div>
    )
};