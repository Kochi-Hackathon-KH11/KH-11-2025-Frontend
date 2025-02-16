import Image from "next/image";

interface RecordButtonProps {
    onClick: () => void;
    buttonState: "play" | "pause" | "restart" | "record";
}

const RecordButton: React.FC<RecordButtonProps> = ({ onClick, buttonState}) => {
    const imageSrc = {
        play: "/play.png",
        pause: "/pause.png",
        restart: "/restart.png",
        record: "/record.svg",
    }[buttonState];

    const altText = {
        play: "Start Recording",
        pause: "Stop Recording",
        restart: "Restart Recording",
        record:"Start Recording"
    }[buttonState];

    return (
        <button
            className="w-[200px] h-[200px] flex items-center justify-center rounded-full border-[3px]"
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
