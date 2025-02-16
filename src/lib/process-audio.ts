import axios from 'axios'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL


/**
 * 
 * @param file .mp3 or .wav file to be uploaded
 * @returns {string} url to the object that can be added to the Audio element
 * 
 * 
 * @author Diljith P D 
 * 
 * @example 
 * const audioUrl = await processAudioFile(file);
 * audioRef.current?.src = audioUrl
 * audioRef.current?.play();
 * 
 * return (
 *  <audio ref={audioRef} />
 * )
 */
export const processAudioFile = async (file: File): Promise<string> => {
    if (!file)
        return "";
    const formData = new FormData()
    formData.append('audio-file', file)

    const response = await axios.post<Blob>(
        `${backendUrl}/audio/file/`,
        formData,
        {
            headers: { 'Content-Type': 'multipart/form-data' },
            responseType: 'blob'
        },
    );

    const audioUrl = URL.createObjectURL(response.data);
    return audioUrl;
}


export const createStreamFromAudioUrl = async (url: string): Promise<MediaStream> => {
    const audioContext = new AudioContext();
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = false;

    const destination = audioContext.createMediaStreamDestination();
    source.connect(destination);
    source.start();

    return destination.stream;
};