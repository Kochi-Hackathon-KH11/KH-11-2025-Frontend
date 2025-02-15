import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <AudioPlayer src="/sample.mp3" />
    </div>
  );
}
