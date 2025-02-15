import SimplePeer from 'simple-peer';

export class WebRTCManager {
  private peer: any = null;
  private localStream: MediaStream | null = null;

  constructor() {}

  async initializeLocalStream(): Promise<MediaStream> {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    return this.localStream;
  }

  createPeer(initiator: boolean, stream: MediaStream, onSignal: (data: SimplePeer.SignalData) => void) {
    this.peer = new SimplePeer({
      initiator,
      stream,
    });

    this.peer.on('signal', (data) => {
      onSignal(data);
    });

    this.peer.on('stream', (remoteStream) => {
      const audioElement = document.getElementById('remote-audio') as HTMLAudioElement;
      if (audioElement) {
        audioElement.srcObject = remoteStream;
      }
    });

    return this.peer;
  }

  signal(data: SimplePeer.SignalData): void {
    this.peer?.signal(data);
  }

  destroy(): void {
    this.peer?.destroy();
    this.localStream?.getTracks().forEach((track) => track.stop());
  }
}