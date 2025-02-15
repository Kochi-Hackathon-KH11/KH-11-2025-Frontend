'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './styles.module.css';
import RoundButton from "../roundButton";

const CallerCard = () => {
    const router = useRouter();
    const [callButtonStatus, setCallButtonStatus] = useState<boolean>(false);

    const initiateCall = () => {
        console.log("initiating the call");

    }

    const changeButtonStatus = () => {
        console.log("cliked")
        setCallButtonStatus((prevState: boolean) => !prevState);
    }
    return (
        <div className={styles['caller-card']}>
            <div className={styles['caller-card-detail']} onClick={changeButtonStatus}>
                {/* Mayank Gupta */}
                <div className={styles['caller-card-name']}>Mayank Gupta</div>
            </div>
            {callButtonStatus &&
                <div className={styles['caller-card-button-container']}>
                    <RoundButton buttonType={'call'} dimension={36} iconDimension={16} functionToHandle={initiateCall}/>
                </div>
            }
        </div>
    )
};

export default CallerCard;