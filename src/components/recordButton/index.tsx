import Image from "next/image";

interface RecordButtonProps {
    onClick: () => void;
    isRecording: boolean;
}

const RecordButton: React.FC<RecordButtonProps> = ({ onClick, isRecording }) => {
    return (
        <button
            className="w-[300px] h-[300px] flex items-center justify-center rounded-full border-[3px]"
            onClick={onClick}
        >
            <Image 
                src={isRecording ? "/recording.png" : "/play.png"} 
                alt={isRecording ? "Stop Recording" : "Start Recording"} 
                width={64} 
                height={64} 
            />
        </button>
    );
};

export default RecordButton;
