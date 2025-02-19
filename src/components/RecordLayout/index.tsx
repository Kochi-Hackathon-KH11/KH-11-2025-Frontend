"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import AudioPlayer from "@/components/audioPlayer";
import { processAudioFile } from "@/lib/process-audio";
import AudioVisualizer from "@/components/audioVisualizer";
// import {v4 as uuidv4} from 'uuid';

const recordLayout = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isRecorded, setIsRecorded] = useState(false);
    const [recordTime, setRecordTime] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isProcessed, setIsProcessed] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null); 

    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const chunks = useRef<BlobPart[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);


    const [file, setFile] = useState<File | null>(null)


    const toggleRecording = async () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

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
            // fileBlob.current = recordedBlob
            // setFile(new File([recordedBlob], `${uuidv4()}.webm`, { type: 'audio/webm'}))
            setFile(new File([recordedBlob], "output.webm", { type: 'audio/webm'}))
            chunks.current = []
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
    
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith("audio/")) {
            console.log(file.name)
            setFile(file)
            setIsRecorded(true);
        } else {
            console.error("Invalid file type. Please upload an audio file.");
        }
      };


    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    const stopRecording = () => {
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
        }
        setIsRecording(false);
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const restartRecording = () => {
        setIsRecorded(false);
        setIsProcessed(false);
        setAudioUrl(null);
        setRecordTime(0);  
    };

    const submitRecording = async () => {
        if (!file) {
            console.error("No recorded audio available.");
            return;
        }

        setIsAnalyzing(true);
        console.log(file);
        const response = await processAudioFile(file);
        setFile(null);
        setAudioUrl(response)
        setIsAnalyzing(false);
        setIsProcessed(true);
    };
    

    return (
        <div className="flex flex-col items-center gap-4">
        {!isRecorded ? (
            <>
                <div className = "">
                    <button
                        className={`w-[300px] h-[300px] flex items-center justify-center rounded-full border-[3px] transition-all `} onClick={toggleRecording}>
                        <AudioVisualizer isRecording={isRecording} />
                        <Image src={isRecording ? "/pause.png" : "/play.png"} alt="Record" width={80} height={80} />
                    </button>
                </div>
                <div className="text-white text-lg">
                    {isRecording ? `Recording: ${recordTime}s` : "Tap to Record"}
                </div>
                <button className="text-white w-[312px] h-[64px] rounded-[50px]" style={{ background: "linear-gradient(to right, #FA27F6, #8885F3, white)" }} onClick={triggerFileUpload}>
                    Upload Recording
                </button>
                <input
                    type="file"
                    accept="audio/*"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                />
            </>
        ) : (
            <div className="flex flex-col items-center gap-4">
                <button className="w-[300px] h-[300px] flex items-center justify-center rounded-full border-[3px]" onClick={restartRecording}>
                    <Image src='/restart.png' alt="Restart" width={64} height={64} />
                </button>
                <div className="text-white text-lg h-[30px]">{isRecording ? `Recording: ${recordTime}s` : ""}</div>

                {isAnalyzing ? (
                    <div className="flex justify-center items-center bg-black">
                    <div className="relative w-[312px] h-[64px] flex items-center justify-center text-white font-medium rounded-full overflow-hidden bg-black">
                        <span className="absolute animate-gradient-border"></span>
                        <span className="relative z-10">Analyzing...</span>
                    </div>

                    <style jsx>{`
                        @keyframes gradientBorder {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                        }

                        .animate-gradient-border {
                        position: absolute;
                        inset: 0;
                        border-radius: 9999px;
                        padding: 3px;
                        background: linear-gradient(45deg, #FA27F6, #8885F3, white);
                        background-size: 300% 300%;
                        animation: gradientBorder 2s infinite linear;
                        }

                        .animate-gradient-border::before {
                        content: "";
                        position: absolute;
                        inset: 3px;
                        background: black;
                        border-radius: inherit;
                        z-index: 1;
                        }
                    `}</style>
                    </div>
                ) :
                isProcessed && audioUrl? (
                    <div>
                        <AudioPlayer src={audioUrl} />
                    </div>
                ) : (
                    <button className="text-white w-[312px] h-[64px] rounded-[50px]" style={{ background: "linear-gradient(to right, #FA27F6, #8885F3, white)" }} onClick={submitRecording}>
                    Submit
                    </button>
                )}
            </div>
        )}
        </div>
    );
    };

export default recordLayout;
