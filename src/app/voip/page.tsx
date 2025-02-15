'use client'
import CallerCard from "@/components/callerCard";
import CallerPage, { CallState } from "@/components/callerPage";
import { Signaling } from "@/lib/signaling";
import { WebRTCManager } from "@/lib/webrtc";
import { useEffect, useRef, useState } from "react";

export default function Page() {
    const socketRef = useRef<Signaling>(null);
    const webRtcRef = useRef<WebRTCManager>(null);
    const [users, setUsers] = useState([]);
    const [callState, setCallState] = useState<CallState | null>(null);

    useEffect(() => {
        socketRef.current = new Signaling();
        webRtcRef.current = new WebRTCManager();

        const updateUsers = (data) => {
            setUsers(data);
        }

        socketRef.current.on('users-updated', updateUsers);

        return () => {
            socketRef.current.off('users-updated', updateUsers);
        }


    }, []);


    const offerHandler = (sid: string) => {
        if (!webRtcRef.current)
            return;

        setCallState('calling')

    }

    return (
        <>
            {
                users.map((data, index) => (
                    <CallerCard 
                        key={index} 
                        {...data}
                        offerHandler={offerHandler}
                     />
                ))
            }

            {
                callState && (
                    <CallerPage callState={callState} />
                )
            }
        </>
    )
}