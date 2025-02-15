import styles from './styles.module.css'
import Image from 'next/image';
import Call from '/public/call.svg'
import { FC } from 'react'
interface RoundButtonProps {
    buttonType: 'call' | 'accept' | 'end' | 'activate',
    dimension: number,
    iconDimension: number,
    functionToHandle: () => void,
}

const RoundButton: FC<RoundButtonProps> = ({buttonType, dimension, iconDimension, functionToHandle}) => {
    return (
        <div style={{ height: `${dimension}px`, width: `${dimension}px`, borderRadius: `${dimension / 2}px`}} className={styles['round-button']} onClick={functionToHandle}>
            <Image src = {Call} alt='call' height={iconDimension} width={iconDimension} className={styles['round-button-icon']}/>
        </div>
    )
};

export default RoundButton;