'use client'
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import styles from './styles.module.css';
import RoundButton from "../roundButton";

interface CallerCardProps {
    username: string,
    sid: string,
    online: boolean,
    offerHandler: (sid: string) => void,
}


// get the username via props
const CallerCard: FC<CallerCardProps> = ({
    username,
    sid,
    online,
    offerHandler
}) => {
    const [callButtonStatus, setCallButtonStatus] = useState<boolean>(false);

    const initiateCall = () => {
        console.log("initiating the call");
        offerHandler(sid)
    }

    const changeButtonStatus = () => {
        console.log("cliked")
        setCallButtonStatus((prevState: boolean) => !prevState);
    }
    return (
        <div className={styles['caller-card']}>
            <div className={styles['caller-card-detail']} onClick={changeButtonStatus}>
                {/* Mayank Gupta */}
                <div className={styles['caller-card-name']}> {username} </div>
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