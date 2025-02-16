import styles from './styles.module.css'
import Image from 'next/image';
import CallIcon from '/public/call.svg';
import RejectIcon from '/public/end-call.svg'
import EndIcon from '/public/phone-off.svg';
import SparkleIcon from '/public/sparkle.svg';
import { FC } from 'react'

interface RoundButtonProps {
    buttonType: 'call' | 'accept' | 'reject' | 'end' | 'activate',
    dimension: number,
    iconDimension: number,
    functionToHandle: (...args: any[]) => void,
}

const buttonStyles = {
    call:{icon: CallIcon, bgColor:'linear-gradient(95deg, #FA27F6 -1.09%, #8885F3 64.69%, #FFF 130.48%)'},
    accept : {icon: CallIcon, bgColor:'linear-gradient(95deg, #3DA02F -1.09%, #FFF 130.48%)'},
    reject : {icon: RejectIcon, bgColor:'linear-gradient(95deg, #F00 -4.43%, #FFF6F6 131%)'},
    end : {icon: EndIcon, bgColor:'linear-gradient(129deg, #F00 0.27%, #FFF6F6 125.63%)'},
    activate: {icon: SparkleIcon, bgColor:'linear-gradient(133deg, #512FF6 -11.93%, #21AEC6 114.29%)'}
}
const RoundButton: FC<RoundButtonProps> = ({buttonType, dimension, iconDimension, functionToHandle}) => {
    const {icon, bgColor} = buttonStyles[buttonType]
    return (
        <div style={{ height: `${dimension}px`, width: `${dimension}px`, borderRadius: `${dimension / 2}px`, background:bgColor}} className={styles['round-button']} onClick={functionToHandle}>
            <Image src = {icon} alt='call' height={iconDimension} width={iconDimension}/>
        </div>
    )
};

export default RoundButton;