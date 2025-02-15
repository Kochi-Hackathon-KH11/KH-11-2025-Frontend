"use client";
import { useRef, useState, useEffect } from "react";

const AudioPlayer = ({ src }: { src: string }) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.addEventListener("timeupdate", () => {
				setCurrentTime(audioRef.current!.currentTime);
			});

			audioRef.current.addEventListener("loadedmetadata", () => {
				setDuration(audioRef.current!.duration);
			});
		}
	}, []);

	const togglePlay = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (audioRef.current) {
			audioRef.current.currentTime = Number(e.target.value);
			setCurrentTime(Number(e.target.value));
		}
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	return (
		<div className="w-[312px] h-[126px] bg-[#242424] rounded-[12px] p-4 flex flex-col items-center justify-between mt-[0px]">
			<audio ref={audioRef} src={src} />
			<div className="flex flex-col items-center w-[100%] mt-[3px]">
			<input
				type="range"
				min="0"
				max={duration}
				value={currentTime}
				onChange={handleSeek}
				className="w-full h-1 appearance-none bg-white outline-none"
				style={{
				accentColor: "#3531BC", 
				}}
			/>
			<div className="flex justify-between w-full mt-1">
				<p className="text-sm text-white">{formatTime(currentTime)}</p>
				<p className="text-sm text-white">{formatTime(duration - currentTime)}</p>
			</div>
		</div>


		<button
			onClick={togglePlay}
			className="text-white w-[75px] h-[36px] rounded-[50px] font-semibold text-[14px]"
			style={{
			background: "linear-gradient(to right, #5527FA 2.7%, #1FB4C4 91.87%, white 172.56%)",

			}}
		>
			{isPlaying ? "Pause" : "Play"}
		</button>
		</div>
	);
};

export default AudioPlayer;
