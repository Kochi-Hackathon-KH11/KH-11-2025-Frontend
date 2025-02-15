"use client";
import { useState, useRef } from "react";
import Navbar from "@/components/navbar";
import CallSlider from "@/components/callSlider";
import DeclineButton from "@/components/declineButton";
import RecordButton from "@/components/recordButton";

interface CallerPageProps {
    callState: CallState;
}
type CallState = "calling" | "oncall" | "recording" | "not-recording" | "ended";

const CallerPage: React.FC<CallerPageProps> = ({ callState }) => {
    const [isToggled, setIsToggled] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isRecorded, setIsRecorded] = useState(false);
    const [recordTime, setRecordTime] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isProcessed, setIsProcessed] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null); 

    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const chunks = useRef<BlobPart[]>([]);
    const fileBlob = useRef<Blob>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [buttonState, setButtonState] = useState<"play" | "pause" | "restart">("play");

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
                const recordedBlob = new Blob(chunks.current, { type: "audio/wav" });
                fileBlob.current = recordedBlob
                const recordedUrl = URL.createObjectURL(recordedBlob);
                console.log("Recorded audio URL:", recordedUrl);

                setAudioUrl(recordedUrl);
                chunks.current = [];
                setIsRecorded(true);
            };

            mediaRecorder.current.start();
            setIsRecording(true);
            setRecordTime(0);

            timerRef.current = setInterval(() => {
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
            return new Promise<void>((resolve) => {
                mediaRecorder.current!.onstop = () => {
                    const recordedBlob = new Blob(chunks.current, { type: "audio/wav" });
                    const recordedUrl = URL.createObjectURL(recordedBlob);
                    console.log("Recorded audio URL:", recordedUrl);
                    
                    setAudioUrl(recordedUrl);
                    chunks.current = [];
                    setIsRecorded(true);
                    resolve();
                };
                mediaRecorder.current!.stop();
            });
        }
    };
    
    const handleRecordButtonClick = async () => {
        if (isRecording) {
            await stopRecording();
            await submitRecording();
        } else {
            await startRecording();
        }
    };
    

    const submitRecording = async () => {
        if (!fileBlob.current) {
            console.error("No recorded audio available.");
            return;
        }

        setIsAnalyzing(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsAnalyzing(false);
        setIsProcessed(true);
    };

    return (
        <div className="h-screen flex flex-col bg-black">
            <Navbar />
            <div className="flex flex-col flex-grow items-center justify-center px-4 text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-white">Mayank Gupta</h1>

                {callState === "calling" && (
                    <p className="text-lg md:text-xl mt-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-pink-300">
                        Calling...
                    </p>
                )}

                {callState === "oncall" && (
                    <div>
                        <p className="text-lg md:text-xl mt-2 text-green-400">On Call</p>
                        <p className="text-lg md:text-xl mt-2 text-green-400">add time here</p>
                        <div className="mt-20 flex flex-col items-center gap-6 w-full max-w-sm">
                            {isToggled && <RecordButton onClick={toggleRecording} buttonState={buttonState} />}
                            <CallSlider toggled={isToggled} setToggled={setIsToggled} />
                        </div>
                    </div>
                )}

                {callState === "recording" && (
                    <p className="text-lg md:text-xl mt-2 text-red-400">Recording...</p>
                )}

                {callState === "not-recording" && (
                    <p className="text-lg md:text-xl mt-2 text-yellow-400">On Call (Not Recording)</p>
                )}

                {callState === "ended" && (
                    <p className="text-lg md:text-xl mt-2 text-gray-400">Call Ended</p>
                )}
            </div>
        </div>
    );
};

export default CallerPage;
