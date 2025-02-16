import styles from './styles.module.css'
import { FC } from 'react'

interface FeatureCardsProps {
    index: number,
    imagePath: string,
    title: string,
    description: string
}

const FeatureCards : FC<FeatureCardsProps> = ({index, imagePath, title, description}) =>{
    return(
        <div className={styles['feature-card']} key={index}>
            <div className={styles['feature-card-image-container']}>
                <img src = {imagePath}></img>
            </div>
            <div className={styles['feature-card-content']}>
                <div className={styles['feature-title']}>{title}</div>
                <div className={styles['feature-description']}>{description}</div>
            </div>
        </div>
    )
};

export default FeatureCards;