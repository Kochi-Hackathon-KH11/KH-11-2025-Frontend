import Image from "next/image";

interface RecordButtonProps {
    onClick: () => void;
    buttonState: "play" | "pause" | "restart";
}

const RecordButton: React.FC<RecordButtonProps> = ({ onClick, buttonState }) => {
    const imageSrc = {
        play: "/play.png",
        pause: "/pause.png",
        restart: "/restart.png"
    }[buttonState];

    const altText = {
        play: "Start Recording",
        pause: "Stop Recording",
        restart: "Restart Recording"
    }[buttonState];

    return (
        <button
            className="w-[300px] h-[300px] flex items-center justify-center rounded-full border-[3px]"
            onClick={onClick}
        >
            <Image 
                src={imageSrc} 
                alt={altText} 
                width={64} 
                height={64} 
            />
        </button>
    );
};

export default RecordButton;
