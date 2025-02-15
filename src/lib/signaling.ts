import io, { Socket } from 'socket.io-client';
import { EventEmitter } from 'eventemitter3';

const SIGNALING_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

export class Signaling extends EventEmitter {
    private socket: Socket;
    private _users: { username: string, online: boolean, sid: string }[]
    private onOffer: (data: any) => void;
    private onAnswer: (data: any) => void;
    private onCandidate: (data: any) => void;
    private onAuthenticated: () => void;
    private onAuthError: (message: string) => void;
    private onUsersUpdated: (users: any[]) => void;

    get users() {
        return this._users;
    }

    constructor() {
        super()
        this.socket = io(SIGNALING_SERVER_URL, {
            transports: ['websocket'],
            autoConnect: false,
        });

        this.socket.on('connect', this.handleConnect);
        this.socket.on('disconnect', this.handleDisconnect);
        this.socket.on('authenticated', this.handleAuthenticated);
        this.socket.on('offer', this.handleOffer);
        this.socket.on('answer', this.handleAnswer);
        this.socket.on('candidate', this.handleCandidate);
        this.socket.on('users_updated', this.handleUsersUpdated);
        this._users = [];
        this.connect()
        this.socket.once('ack', () => {
            this.authenticate("Mayank", "1234");
        })
    }

    // connect to the signaling server
    connect(): void {
        this.socket.connect();
    }

    // Disconnect from the signaling server
    disconnect(): void {
        this.socket.disconnect();
    }

    // Authenticate the user
    authenticate(username: string, password: string): void {
        this.socket.emit('authenticate_user', { username, password });
        this.socket.once('authenticated', () => {
            this.socket.emit("get_all_users")
            this.socket.once("all_users", (data) => {
                this._users = data;
                this.emit('users-updated', data)
            })
        })
    }

    // send WebRTC offer
    sendOffer(to: string, offer: any): void {
        this.socket.emit('offer', { to, offer });
    }

    // send WebRTC answer
    sendAnswer(to: string, answer: any): void {
        this.socket.emit('answer', { to, answer });
    }

    // Send ICE candidate
    sendCandidate(to: string, candidate: any): void {
        this.socket.emit('candidate', { to, candidate });
    }

    // Fetch all users
    fetchAllUsers(): void {
        this.socket.emit('get_all_users');
    }

    // Event handlers
    private handleConnect = () => {
        console.log('Connected to signaling server');
    };

    private handleDisconnect = () => {
        console.log('Disconnected from signaling server');
    };

    private handleAuthenticated = () => {
        if (this.onAuthenticated)
            this.onAuthenticated();
    };

    private handleAuthError = (data: { message: string }) => {
        if (this.onAuthError)
            this.onAuthError(data.message);
    };

    private handleOffer = (data: any) => {
        if (this.onOffer)
            this.onOffer(data);
    };

    private handleAnswer = (data: any) => {
        if (this.onAnswer)
            this.onAnswer(data);
    };

    private handleCandidate = (data: any) => {
        if (this.onCandidate)
            this.onCandidate(data);
    };

    private handleUsersUpdated = (users: any[]) => {
        if (this.onUsersUpdated)
            this.onUsersUpdated(users);
    };

    // Set event callbacks
    setOnAuthenticated(callback: () => void): void {
        this.onAuthenticated = callback;
    }

    setOnAuthError(callback: (message: string) => void): void {
        this.onAuthError = callback;
    }

    setOnOffer(callback: (data: any) => void): void {
        this.onOffer = callback;
    }

    setOnAnswer(callback: (data: any) => void): void {
        this.onAnswer = callback;
    }

    setOnCandidate(callback: (data: any) => void): void {
        this.onCandidate = callback;
    }

    setOnUsersUpdated(callback: (users: any[]) => void): void {
        this.onUsersUpdated = callback;
    }

}