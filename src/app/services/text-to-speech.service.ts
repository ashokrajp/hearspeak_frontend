import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {
  private voices: SpeechSynthesisVoice[] = [];
  private voicesLoaded: boolean = false;

  constructor() {
    this.loadVoices();
  }

  private loadVoices(): void {
    const populateVoices = () => {
      this.voices = speechSynthesis.getVoices();
      this.voicesLoaded = true;
    };

    if (speechSynthesis.getVoices().length > 0) {
      populateVoices();
    } else {
      speechSynthesis.onvoiceschanged = populateVoices;
    }
  }



//-----------------------------------first ------------------------//
 
// private getVoiceByLanguageAndGender(language: 'english' | 'hindi', gender: 'male' | 'female'): SpeechSynthesisVoice {
//   console.log("Requested language:", language, "Requested gender:", gender);

//   const englishFemaleVoiceNames = ['Google UK English Female', 'Google US English Female'];
//   const englishMaleVoiceNames = ['Google UK English Male', 'Google US English Male'];
//   const hindiFemaleVoiceNames = ['Google हिन्दी महिला', 'Microsoft Neerja - Hindi (India)'];
//   const hindiMaleVoiceNames = ['Google UK English Male', 'Google US English Male'];

//   let targetVoiceNames: string[] = [];

//   if (language === 'english') {
//       targetVoiceNames = gender === 'female' ? englishFemaleVoiceNames : englishMaleVoiceNames;
//   } else if (language === 'hindi') {
//       targetVoiceNames = gender === 'female' ? hindiFemaleVoiceNames : hindiMaleVoiceNames;
//   }

//   console.log("Target voice names:", targetVoiceNames);

//   // Log available voices for debugging
//   console.log("Available voices:", this.voices.map(voice => ({ name: voice.name, lang: voice.lang })));

//   // Prioritize Google हिंदी पुरुष for male Hindi
//   if (language === 'hindi' && gender === 'male') {
//       const hindiMalePriorityVoice = this.voices.find(voice => voice.name === 'Google हिंदी पुरुष');
//       if (hindiMalePriorityVoice) {
//           console.log("Selected voice: Google हिंदी पुरुष");
//           return hindiMalePriorityVoice;
//       }
//   }

//   // Find the specific voice from the target list
//   let selectedVoice = this.voices.find(voice => targetVoiceNames.includes(voice.name));

//   // If no specific voice found, try to find a fallback voice matching the language
//   if (!selectedVoice) {
//       console.warn("Specific voice not found, falling back to any matching language voice.");
//       selectedVoice = this.voices.find(voice => 
//           (language === 'english' && voice.lang.includes('en')) || 
//           (language === 'hindi' && voice.lang.includes('hi'))
//       );
//   }

//   // If no matching language voice found, fall back to the first available voice
//   if (!selectedVoice) {
//       console.warn("No matching language voice found, falling back to default voice.");
//       selectedVoice = this.voices[0];
//   }

//   console.log("Selected voice:", selectedVoice ? selectedVoice.name : 'None found');
//   return selectedVoice;
// }

//   private ensureVoicesLoaded(): Promise<void> {
//     return new Promise((resolve) => {
//       if (this.voicesLoaded) {
//         resolve();
//       } else {
//         const interval = setInterval(() => {
//           if (this.voicesLoaded) {
//             clearInterval(interval);
//             resolve();
//           }
//         }, 70);
//       }
//     });
//   }
//   private removeEmojis(text: string): string {
//     return text.replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Emoticons
//                .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') // Miscellaneous Symbols and Pictographs
//                .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Transport and Map Symbols
//                .replace(/[\u{1F700}-\u{1F77F}]/gu, '') // Alchemical Symbols
//                .replace(/[\u{1F780}-\u{1F7FF}]/gu, '') // Geometric Shapes Extended
//                .replace(/[\u{1F800}-\u{1F8FF}]/gu, '') // Supplemental Arrows-C
//                .replace(/[\u{1F900}-\u{1F9FF}]/gu, '') // Supplemental Symbols and Pictographs
//                .replace(/[\u{1FA00}-\u{1FA6F}]/gu, '') // Chess Symbols
//                .replace(/[\u{1FA70}-\u{1FAFF}]/gu, '') // Symbols and Pictographs Extended-A
//                .replace(/[\u{2600}-\u{26FF}]/gu, '') // Miscellaneous Symbols
//                .replace(/[\u{2700}-\u{27BF}]/gu, '') // Dingbats
//                .replace(/[\u{FE00}-\u{FE0F}]/gu, '') // Variation Selectors
//                .replace(/[\u{1F018}-\u{1F0F5}]/gu, '') // Domino Tiles
//                .replace(/[\u{1F0A0}-\u{1F0AE}]/gu, ''); // Playing Cards
//   }

//   async speak(text: string, language: 'english' | 'hindi', gender: 'male' | 'female'): Promise<void> {
//     await this.ensureVoicesLoaded();
//     console.log("--------------------speak tesrt",gender);
//     console.log("--------------------speak ddddddddddddddd",language);

//     const cleanedText = this.removeEmojis(text);
//     const speech = new SpeechSynthesisUtterance(cleanedText);
//     speech.voice = this.getVoiceByLanguageAndGender(language, gender);
//     speech.rate = 1;  // Normal rate of speech
//     speech.pitch = 1; // Normal pitch

//     speechSynthesis.speak(speech);
//   }


  

//------------------------------second------------------------------//

private getVoiceByLanguageAndGender(language: 'english' | 'hindi', gender: 'male' | 'female'): SpeechSynthesisVoice {
  console.log("Requested language:", language, "Requested gender:", gender);

  const englishFemaleVoiceNames = ['Google UK English Female', 'Google US English Female'];
  const englishMaleVoiceNames = ['Google UK English Male', 'Google US English Male'];
  const hindiFemaleVoiceNames = ['Google हिन्दी महिला', 'Microsoft Neerja - Hindi (India)'];
  const hindiMaleVoiceNames = ['Google UK English Male', 'Google US English Male'];

  let targetVoiceNames: string[] = [];

  if (language === 'english') {
      targetVoiceNames = gender === 'female' ? englishFemaleVoiceNames : englishMaleVoiceNames;
  } else if (language === 'hindi') {
      targetVoiceNames = gender === 'female' ? hindiFemaleVoiceNames : hindiMaleVoiceNames;
  }

  if (language === 'hindi' && gender === 'male') {
      const hindiMalePriorityVoice = this.voices.find(voice => voice.name === 'Google हिंदी पुरुष');
      if (hindiMalePriorityVoice) {
          return hindiMalePriorityVoice;
      }
  }
  let selectedVoice = this.voices.find(voice => targetVoiceNames.includes(voice.name));
  if (!selectedVoice) {
      selectedVoice = this.voices.find(voice => 
          (language === 'english' && voice.lang.includes('en')) || 
          (language === 'hindi' && voice.lang.includes('hi'))
      );
  }

  if (!selectedVoice) {
      selectedVoice = this.voices[0];
  }

  return selectedVoice;
}

  private ensureVoicesLoaded(): Promise<void> {
    return new Promise((resolve) => {
      if (this.voicesLoaded) {
        resolve();
      } else {
        const interval = setInterval(() => {
          if (this.voicesLoaded) {
            clearInterval(interval);
            resolve();
          }
        }, 70);
      }
    });
  }
  private removeEmojis(text: string): string {
    return text.replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Emoticons
               .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') // Miscellaneous Symbols and Pictographs
               .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Transport and Map Symbols
               .replace(/[\u{1F700}-\u{1F77F}]/gu, '') // Alchemical Symbols
               .replace(/[\u{1F780}-\u{1F7FF}]/gu, '') // Geometric Shapes Extended
               .replace(/[\u{1F800}-\u{1F8FF}]/gu, '') // Supplemental Arrows-C
               .replace(/[\u{1F900}-\u{1F9FF}]/gu, '') // Supplemental Symbols and Pictographs
               .replace(/[\u{1FA00}-\u{1FA6F}]/gu, '') // Chess Symbols
               .replace(/[\u{1FA70}-\u{1FAFF}]/gu, '') // Symbols and Pictographs Extended-A
               .replace(/[\u{2600}-\u{26FF}]/gu, '') // Miscellaneous Symbols
               .replace(/[\u{2700}-\u{27BF}]/gu, '') // Dingbats
               .replace(/[\u{FE00}-\u{FE0F}]/gu, '') // Variation Selectors
               .replace(/[\u{1F018}-\u{1F0F5}]/gu, '') // Domino Tiles
               .replace(/[\u{1F0A0}-\u{1F0AE}]/gu, ''); // Playing Cards
  }
  // async speak(text: string, gender: 'male' | 'female'): Promise<void> {
  //   await this.ensureVoicesLoaded();

  //   const speech = new SpeechSynthesisUtterance(text);
  //   speech.voice = this.getVoiceByGender(gender);
  //   speech.rate = 1;  // Normal rate of speech
  //   speech.pitch = 1; // Normal pitch

  //   speechSynthesis.speak(speech);
  // }
  // async speak(text: string, language: 'english' | 'hindi', gender: 'male' | 'female'): Promise<void> {
  //   await this.ensureVoicesLoaded();
  //   console.log("--------------------speak tesrt",gender);
  //   console.log("--------------------speak ddddddddddddddd",language);

  //   const cleanedText = this.removeEmojis(text);
  //   const speech = new SpeechSynthesisUtterance(cleanedText);
  //   speech.voice = this.getVoiceByLanguageAndGender(language, gender);
  //   speech.rate = 1;  // Normal rate of speech
  //   speech.pitch = 1; // Normal pitch

  //   speechSynthesis.speak(speech);
  // }



  private textQueue: string[] = [];
  private isSpeaking: boolean = false;
  private currentLanguage: 'english' | 'hindi' | undefined;
  private currentGender: 'male' | 'female' | undefined;
  
 
  
  private speakNext(): void {
    if (this.textQueue.length === 0) {
      this.isSpeaking = false;
      return;
    }

    this.isSpeaking = true;
    const text = this.textQueue.shift();
    if (text) {
      const speech = new SpeechSynthesisUtterance(this.removeEmojis(text));
      speech.voice = this.getVoiceByLanguageAndGender(this.currentLanguage!, this.currentGender!);
      speech.rate = 1;  // Normal rate of speech
      speech.pitch = 1; // Normal pitch

      speech.onend = () => {
        this.speakNext();
      };

      speechSynthesis.speak(speech);
    } else {
      this.isSpeaking = false;
    }
  }

  async speak(text: string, language: 'english' | 'hindi', gender: 'male' | 'female'): Promise<void> {
    await this.ensureVoicesLoaded();
    this.currentLanguage = language;
    this.currentGender = gender;

    const lines = text.split('\n').filter(line => line.trim() !== '');
    this.textQueue.push(...lines);

    if (!this.isSpeaking) {
      this.speakNext();
    }
  }


  
}
