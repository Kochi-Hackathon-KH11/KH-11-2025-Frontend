"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CallSlider from "@/components/callSlider";
import RecordButton from "@/components/recordButton";
import { processAudioFile } from "@/lib/process-audio";
import RoundButton from "@/components/roundButton";
import { useSocketContext } from "@/hooks/useSocketContext";
import { WebRTCManager } from "@/lib/webrtc";

interface CallerPageProps { 
    callState: CallState;
    details: { username: string, sid: string, offer?: any },
}
export type CallState = "calling" | "oncall" | "incoming" | "ended";

const CallerPage: React.FC<CallerPageProps> = ({ callState, details }) => {
    const [isToggled, setIsToggled] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isRecorded, setIsRecorded] = useState(false);
    const [recordTime, setRecordTime] = useState(0);
    const [isProcessed, setIsProcessed] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [callDuration, setCallDuration] = useState(0); 

    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const chunks = useRef<BlobPart[]>([]);
    const fileBlob = useRef<Blob>(null);
    const recordTimerRef = useRef<NodeJS.Timeout | null>(null);
    const callTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [buttonState, setButtonState] = useState<"play" | "pause" | "restart">("play");



    useEffect(() => {
        if(!isToggled){
            restartRecording();
        }
    }, [isToggled])
    
    useEffect(() => {
        if (callState === "oncall") {
            setCallDuration(0);
            callTimerRef.current = setInterval(() => {
                setCallDuration((prev) => prev + 1);
            }, 1000);
        } else if (callState === "ended" && callTimerRef.current) {
            clearInterval(callTimerRef.current);
            callTimerRef.current = null;
        }

        return () => {
            if (callTimerRef.current) {
                clearInterval(callTimerRef.current);
            }
        };
    }, [callState]);


    useEffect(() => {
        if (file) {
            submitRecording()
        }
    }, [file]);


    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);

            mediaRecorder.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.current.push(event.data);
                }
            };

            mediaRecorder.current.onstop = () => {
                const recordedBlob = new Blob(chunks.current, { type: "audio/webm" });
                setFile(new File([recordedBlob], "output.webm", { type: "audio/webm" }));
                console.log(recordedBlob);
                setIsRecorded(true);
            };

            mediaRecorder.current.start();
            setIsRecording(true);
            setRecordTime(0);

            recordTimerRef.current = setInterval(() => {
                setRecordTime((prev) => prev + 1);
            }, 1000);
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const toggleRecording = async () => {
        if (isRecording) {
            await stopRecording();
            setButtonState("play");
        } else {
            await startRecording();
            setButtonState("pause");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
        }
        setIsRecording(false);
        if (recordTimerRef.current) {
            clearInterval(recordTimerRef.current);
            recordTimerRef.current = null;
        }
        // setTimeout(() => {
        //     if (file) {
        //         submitRecording();
        //     } else {
        //         console.error("File not available for submission");
        //     }
        // }, 500);
    };

    const submitRecording = async () => {
        if (!file) {
            console.error("No recorded audio available.");
            return;
        }
        console.log(file);
        const response = await processAudioFile(file);
        setAudioUrl(response);
        setIsProcessed(true);
    };

    const restartRecording = () => {
        setIsRecorded(false);
        setIsProcessed(false);
        setAudioUrl(null);
        setRecordTime(0);
        setButtonState('play')
        mediaRecorder.current = null;
        setFile(null)
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };
    
    const { socketRef, webRtcRef, acceptOffer, setCallState, audioRef } = useSocketContext()

    const callEndedHandler = () => {
        setCallState('ended');
        socketRef.current.endCall(details.sid)
        
        webRtcRef.current.destroy();
        webRtcRef.current = new WebRTCManager();
        setTimeout(() => {
            setCallState(null)
        }, 3000)
    }
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex flex-col bg-black">
            <Navbar />
            <div className="flex flex-col h-[650px] justify-between px-4 text-center">
            <div className="flex flex-col items-center mt-[180px]">
                    <h1 className="text-3xl md:text-5xl font-bold text-white"> {details.username} </h1>
                    <p className="text-lg md:text-xl mt-2">
                        {callState === "calling" && <span className="text-pink-500">Calling...</span>}
                        {callState === "oncall" && <span className="text-green-400">On Call</span>}
                        {callState === "incoming" && <span className="text-red-400">Incoming...</span>}
                        {callState === "ended" && <span className="text-gray-400">Call Ended</span>}
                    </p>
                    {(callState === "oncall" || callState === "ended") && (
                        <p className="text-lg md:text-xl mt-2 text-white">
                            Duration: {formatTime(callDuration)}
                        </p>
                    )}
                </div>
                {callState === "oncall" && isToggled && (
                    <div className="absolute top-[360px] left-1/2 transform -translate-x-1/2">
                        <RecordButton onClick={toggleRecording} buttonState={buttonState}/>
                    </div>
                )}
                
                <audio ref={audioRef} autoPlay />

                <div className="flex flex-col items-center justify-center fixed bottom-8 w-full">
                    {(callState == "calling") && (
                        <RoundButton buttonType="reject" dimension={75} iconDimension={36} functionToHandle={() => console.log("Call button clicked")}/>
                    )}
                    {(callState == "incoming") && (
                        <div className="flex gap-[120px]"> 
                            <RoundButton buttonType="call" dimension={75} iconDimension={36} functionToHandle={async () => {
                                console.log("clicked accept");
                                await acceptOffer(details.sid, details.offer);
                                setCallState('oncall');
                            }}/>
                            <RoundButton buttonType="reject" dimension={75} iconDimension={50} functionToHandle={callEndedHandler}/>
                        </div>
                    )}
                    {(callState == "oncall") && (
                        <div className="flex items-center justify-center gap-[40px]">
                            <CallSlider toggled={isToggled} setToggled={setIsToggled} />
                            <RoundButton buttonType="end" dimension={75} iconDimension={36} functionToHandle={callEndedHandler}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CallerPage;
