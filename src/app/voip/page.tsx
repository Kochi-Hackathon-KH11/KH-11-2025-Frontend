'use client'
import CallerCard from "@/components/callerCard";
import CallerPage, { CallState } from "@/components/callerPage";
import { useSocketContext } from "@/hooks/useSocketContext";
import { Signaling } from "@/lib/signaling";
import { WebRTCManager } from "@/lib/webrtc";
import { useEffect, useRef, useState } from "react";

export default function Page() {

    const { webRtcRef, users, sendOffer, socketRef, setCallState, setCallee, callState, callee } = useSocketContext();

    const offerHandler = async (username: string, sid: string) => {
        if (!webRtcRef.current)
            return;

        setCallState('calling')
        setCallee({ username, sid })
        await sendOffer(sid)
    }

    const answerHandler = (username: string, sid: string) => {
        setCallState('calling')
        setCallee({
            username,
            sid,
        })
    }

    useEffect(() => {
        if (!socketRef.current)
            return;
        socketRef.current.setOnOffer(async data => {
            console.log(data)
            setCallState('incoming');
            const username = data['from']
            const fromSid = data['from-sid']


            setCallee({
                username: username,
                sid: fromSid,
                offer: data.offer
            })
        })

        socketRef.current.setOnEndCall(() => {
            setCallState('ended')
            webRtcRef.current.destroy();
            webRtcRef.current = new WebRTCManager();
            setTimeout(() => {
                setCallState(null)
            }, 3000)
        })

    }, [socketRef.current]);

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
                    <CallerPage 
                        callState={callState}
                        details={callee}
                    />
                )
            }
        </>
    )
}