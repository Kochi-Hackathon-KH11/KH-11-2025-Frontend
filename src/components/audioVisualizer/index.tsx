"use client";
import React, { useRef, useEffect, useState } from "react";

const AudioVisualizer = ({ isRecording }: { isRecording: boolean }) => {
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const animationRef = useRef<number | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [wavePath, setWavePath] = useState("");

    useEffect(() => {
        if (isRecording) {
            startVisualizer();
        } else {
            stopVisualizer();
        }

        return () => stopVisualizer();
    }, [isRecording]);

    const startVisualizer = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            audioContextRef.current = new AudioContext();
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 512;

            const bufferLength = analyserRef.current.frequencyBinCount;
            dataArrayRef.current = new Uint8Array(bufferLength);

            sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
            sourceRef.current.connect(analyserRef.current);

            drawWaveform();
        } catch (err) {
            console.error("Error accessing microphone:", err);
        }
    };

    const stopVisualizer = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }
        setWavePath(""); // Clear the waveform
    };

    const drawWaveform = () => {
        const renderFrame = () => {
            if (!analyserRef.current || !dataArrayRef.current) return;

            analyserRef.current.getByteTimeDomainData(dataArrayRef.current);
            setWavePath(generateWavePath(dataArrayRef.current));

            animationRef.current = requestAnimationFrame(renderFrame);
        };

        renderFrame();
    };

    const generateWavePath = (dataArray: Uint8Array) => {
        const centerX = 200; 
        const centerY = 200;
        const baseRadius = 150;
        const maxAmplitude = 60;

        let path = "";
        const totalPoints = dataArray.length;
        const angleStep = (2 * Math.PI) / totalPoints;

        for (let i = 0; i < totalPoints; i++) {
            const value = dataArray[i] / 255;
            const amplitude = baseRadius + (value ** 2) * maxAmplitude;

            const angle = i * angleStep;
            const x = centerX + amplitude * Math.cos(angle);
            const y = centerY + amplitude * Math.sin(angle);

            if (i === 0) {
                path += `M ${x} ${y}`;
            } else {
                path += ` L ${x} ${y}`;
            }
        }
        return path + " Z";
    };

    return (
        <div className="flex justify-center items-center h-60 w-60 absolute">
            <svg width="400" height="400" viewBox="0 0 400 400" className="absolute">
                <path
                    d={wavePath}
                    fill="none"
                    stroke="rgba(0, 150, 255, 0.9)"
                    strokeWidth="3"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export default AudioVisualizer;
