import SimplePeer from 'simple-peer';

export class WebRTCManager {
  private peer: any = null;
  private localStream: MediaStream | null = null;
  private audioElement: HTMLAudioElement

  public attachAudioElement(audioElement: HTMLAudioElement) {
    this.audioElement = audioElement;
    if (this.peer != null)
      this.peer.on('stream', this.attachStream)
  }

  public stopStream() {
    this.localStream.getTracks().forEach(track => track.enabled = false);
  }

  // public resumeStream() {
  //   this.localStream.getTracks().forEach(track => track.enabled = false);
  // }

  async initializeLocalStream(): Promise<MediaStream> {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    return this.localStream;
  }

  private attachStream = remoteStream => {
    if (this.audioElement)
      this.audioElement.srcObject = remoteStream;
  }

  createPeer(initiator: boolean, stream: MediaStream, onSignal: (data: SimplePeer.SignalData) => void) {
    this.peer = new SimplePeer({
      initiator,
      stream,
      trickle: false
    });

    this.peer.on('signal', (data) => {
      onSignal(data);
    });

    this.peer.on('stream', this.attachStream);

    return this.peer;
  }

  signal(data: SimplePeer.SignalData): void {
    this.peer?.signal(data);
  }

  destroy(): void {
    this.peer?.destroy();
    this.localStream?.getTracks().forEach((track) => track.stop());
  }

  public replaceTrack(newTrack: MediaStreamTrack | null, type: 'local' | 'processed'): void {
    const sender = this.peer?._pc?.getSenders().find((s) => s.track?.kind === 'audio');
    if (sender && newTrack) {
      sender.replaceTrack(newTrack);
    }

    if (type == 'processed') {
      newTrack.onended = () => {
        this.replaceTrack(this.getLocalTrack(), 'local')
      }
    }
  }

  public getLocalTrack(): MediaStreamTrack | null {
    return this.localStream?.getAudioTracks()[0] || null;
  }

  // Fix the resumeStream method
  public resumeStream() {
    this.localStream?.getTracks().forEach(track => track.enabled = true);
  }

}