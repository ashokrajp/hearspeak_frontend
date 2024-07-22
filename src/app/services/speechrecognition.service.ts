import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechrecognitionService {

  private recognition: any;
  public isListening = false;
  public result = '';

  constructor(private zone: NgZone) {
    const { webkitSpeechRecognition }: IWindow = <IWindow><unknown>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: any) => {
      this.zone.run(() => {
        this.result = event.results[0][0].transcript;
        this.isListening = false;
      });
    };

    this.recognition.onerror = (event: any) => {
      this.zone.run(() => {
        console.error(event.error);
        this.isListening = false;
      });
    };

    this.recognition.onend = () => {
      this.zone.run(() => {
        this.isListening = false;
      });
    };
  }

  startListening() {
    this.isListening = true;
    try {
      this.recognition.start();
    } catch (error) {
      console.error('Speech recognition error:', error);
      this.isListening = false;
    }
  }

  stopListening() {
    this.isListening = false;
    this.recognition.stop();
  }

  requestMicrophonePermission() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        // Permission granted
        console.log('Microphone permission granted');
      })
      .catch((error) => {
        // Permission denied
        console.error('Microphone permission denied:', error);
      });
  }
}

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}
