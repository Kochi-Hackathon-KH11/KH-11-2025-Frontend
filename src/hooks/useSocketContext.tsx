import { CallState } from "@/components/callerPage";
import { Signaling } from "@/lib/signaling";
import { WebRTCManager } from "@/lib/webrtc";
import { useRouter } from "next/navigation";
import { createContext, Dispatch, ReactNode, RefObject, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

interface ContextInterface {
    socketRef: RefObject<Signaling>,
    webRtcRef: RefObject<WebRTCManager>,
    users: any[],
    callState: CallState | null,
    callee: {
        username: string,
        sid: string,
        offer?: any,
    } | null,
    setCallState: Dispatch<SetStateAction< CallState | null>>,
    setCallee: Dispatch<SetStateAction<{
        username: string,
        sid: string,
        offer?: any,
    } | null>>

    sendOffer: (to: string) => Promise<void>,
    acceptOffer: (from: string, offer: any) => Promise<void>,
    audioRef: RefObject<HTMLAudioElement>;
}


export const SocketContext = createContext<ContextInterface>(null)

export const SocketContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const router = useRouter();
    const socketRef = useRef<Signaling>(null);
    const webRtcRef = useRef<WebRTCManager>(null);
    const [users, setUsers] = useState([]);

    const [callState, setCallState] = useState<CallState | null>(null);
    const [callee, setCallee] = useState<{
        username: string,
        sid: string,
        offer?: any,
    } | null>(null)
    const [jwt, setJwt] = useState<string>("")
    const audioRef = useRef<HTMLAudioElement>(null);


    useEffect(() => {
        socketRef.current = new Signaling();
        webRtcRef.current = new WebRTCManager();

        const updateUsers = (data) => {
            setUsers(data);
        }

        socketRef.current.on('users-updated', updateUsers);

        const existingToken = localStorage.getItem('token')

        if (!existingToken)
            router.push('/login')
        else 
            setJwt(existingToken)

        return () => {
            socketRef.current.off('users-updated', updateUsers);
        }

    }, []);


    const sendOffer = async (to: string) => {
        const localStream = await webRtcRef.current.initializeLocalStream()
        const peer = webRtcRef.current.createPeer(true, localStream, (offer) => {
            socketRef.current.sendOffer(to, offer)
        })


        socketRef.current.setOnAnswer((data) => {
            peer.signal(data.answer);
            setCallState('oncall')
            webRtcRef.current.attachAudioElement(audioRef.current)
        })
    }

    const acceptOffer = async (from: string, offer: any) => {
        const localStream = await webRtcRef.current.initializeLocalStream();
        const peer = webRtcRef.current.createPeer(false, localStream, (answer) => {
            socketRef.current.sendAnswer(from, answer)
        })
        console.log(from, offer)
        peer.signal(offer)

        webRtcRef.current.attachAudioElement(audioRef.current);
    }

    return (
        <SocketContext.Provider
            value={{
                socketRef,
                webRtcRef,
                users,
                callee,
                setCallee,
                callState,
                setCallState,
                sendOffer,
                acceptOffer,
                audioRef
            }}
        >
            {children}
        </SocketContext.Provider>
    )
}

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }
    return context;
}