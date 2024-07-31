import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawerMode } from '@angular/material/sidenav';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SpeechrecognitionService } from 'src/app/services/speechrecognition.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [
    trigger('vibrate', [
      state('start', style({
        transform: 'translateX(2px) translateY(-1px) rotate(1deg)'
      })),
      state('end', style({
        transform: 'translateX(-2px) translateY(1px) rotate(-1deg)'
      })),
      transition('start <=> end', animate('50ms ease-in-out'))
    ])
  ]
})
export class ChatComponent {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  @ViewChild(MatMenu) menu!: MatMenu;
  message: any;
  age: any;
  image_name: any;
  token: any;
  new_history: any;
  rownew: any;
  name: any;
  rows: any[] = [];
  isPulsating = false;
  isListening = false;
  selectedLanguage = 'english';
  sidenavMode: MatDrawerMode = 'side';
  isHandset: boolean = false;
  sentMessages: string[] = [];
  isMuted: boolean = false;
  isTyping: boolean = false; // 
  selectedImage: string = 'Theame';
  private subscription: Subscription;
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  constructor(private breakpointObserver: BreakpointObserver,private tts: TextToSpeechService, public speechRecognitionService: SpeechrecognitionService,private cdRef: ChangeDetectorRef ,public authService: AuthService) {
    this.image_name = localStorage.getItem('image_name')?.toString()
    this.token=localStorage.getItem('token')
    this.name = localStorage.getItem('name');
    this.age = localStorage.getItem('age');
  this.subscription=  this.authService.clearChat$.subscribe(() => {
      this.getGeminiMsg(); // Call your getChatListing method here
    });
   }

   toggleMute() {
    this.isMuted = !this.isMuted;
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  changeImage(event: any) {
    this.selectedImage = event.target.value;
  }
  ngOnInit(): void {
    this.getGeminiMsg()

    console.log('ngOnInit - rows:', this.rows);
    this.breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      this.isHandset = result.matches;
      this.sidenavMode = this.isHandset ? 'over' : 'side'; 
    });
      this.image_name = localStorage.getItem('image_name'); 
  
      let greeting: string;
      if (this.image_name == 'male') {
        greeting = `Hello, I am ${this.name}, your AI friend.`;
        const language = this.selectedLanguage === 'english' ? 'english' : 'hindi';
        this.tts.speak(greeting,language, 'male');

      } else if (this.image_name == 'female') {
        const language = this.selectedLanguage === 'english' ? 'english' : 'hindi';
        greeting = `HEllo, I am ${this.name}, your AI friend.`;
        this.tts.speak(greeting,language, 'female');
      } else {
        const language = this.selectedLanguage === 'english' ? 'english' : 'hindi';
        greeting = 'Hello, I am your AI friend.';
        this.tts.speak(greeting,language, 'female'); 
      }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.error('Could not scroll to bottom:', err);
    }
  }
  populateInput(text: string) {
    this.message = text;
  }
 
  sendMessage() {
    if (this.token) {
      if (this.message.trim()) {
        const tempMessage = this.message;
        this.sentMessages.push(tempMessage);
        this.message = '';
        if (!this.rows) {
          this.rows = [];
        }
        this.rows.push({ user_prompt: tempMessage });
      
        
        let obj = {
          defult_prompt: `Please respond to whatever I say in a human-like manner, with short, friendly responses. talk to me like ${this.image_name}  and your name is ${this.name} and never think like you are an ai chatbot. Always assume you are a human and always your name is ${this.name}  and always I am a male and always reply in ${this.selectedLanguage} and also write message in ${this.selectedLanguage}. Don't repeat unneccessary word like name and age.`,
          prompt: tempMessage,
          name:this.name
        };
        this.authService.sendMsg(obj).subscribe((data: any) => {
          this.isTyping = true;
          setTimeout(() => {
            this.isTyping = false;
            if (data.code == 1) {
              const responseText = data.data.text_response;

              if (!this.isMuted) {
                const language = this.selectedLanguage === 'english' ? 'english' : 'hindi';
                this.tts.speak(responseText, language, this.image_name);
              }
              this.rows.push({ text: data.data.text_response });
            } else {
              this.rows=[];
            }
          }, 2000);
        });
      }
    } else {
      if (this.message.trim()) {
        const tempMessage = this.message;
        this.sentMessages.push(tempMessage);
        this.message = '';
        if (!this.rows) {
          this.rows = [];
        }
        this.rows.push({ user_prompt: tempMessage });
        let obj = {
          defult_prompt: `Please respond to whatever I say in a human-like manner, with short, friendly responses. talk to me like ${this.image_name}  and your name is ${this.name} and never think like you are an ai chatbot. Always assume you are a human and always your name is ${this.name}  and always I am a male and always reply in ${this.selectedLanguage} and also write message in ${this.selectedLanguage}. Don't repeat unneccessary word like name and age.`,
          prompt: tempMessage,
        };
        
        this.authService.sendMsg(obj).subscribe((data: any) => {
          this.isTyping = true;
          setTimeout(() => {
            this.isTyping = false;
            if (data.code == 1) {
              this.rows.push({ text: data.data.text_response });
            } else {
              this.rows=[]
            }
          }, 2000);
        });
      }
    }
  }
  
  
  toggleMenu() {
    if (this.menuTrigger) {
      this.menuTrigger.toggleMenu();
    }
  }
  getGeminiMsg() {
    if (this.token !==null &&  this.token !== undefined ) {
      let getChatData={
        name:this.name
      }
      this.isTyping = true; 
      this.authService.getGeminiMsg(getChatData).subscribe((data) => {
        setTimeout(() => {
          this.isTyping = false; 
          if (data.code == 1) {
            this.rows = data.data;
         
          } else {
            this.rows = data.data;
          }
        }, 2000); 
      });
    
    }
  }
  togglePulsate() {
    Swal.fire({
      title: "This feature is under development.",
      width: 450,
      padding: "1.5em",
      color: "#716add",
      background: "#fff url(/images/trees.png)",
      backdrop: `
        rgba(0,0,0,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    } as any).then(() => {
      // this.selectedLanguage = 'english'; 
    });
    this.isPulsating = !this.isPulsating;

    if (this.isPulsating) {
      this.speechRecognitionService.startListening();
    } else {
      this.speechRecognitionService.stopListening();
    }
  }

  ngDoCheck() {
    if (this.speechRecognitionService.result) {
      this.message = this.speechRecognitionService.result;
      this.speechRecognitionService.result = '';
      this.isPulsating = false; 
      this.cdRef.detectChanges(); 
    }

    if (this.speechRecognitionService.isListening !== this.isPulsating) {
      this.isPulsating = this.speechRecognitionService.isListening;
      this.cdRef.detectChanges(); 
    }
  }



  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLanguage = selectElement.value;
    console.log('Language changed to:', this.selectedLanguage);
    if (this.selectedLanguage =='hindi' && this.image_name =='male') {
      Swal.fire({
        title: "This feature is under development.",
        width: 450,
        padding: "1.5em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
          rgba(0,0,0,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      } as any).then(() => {
        this.selectedLanguage = 'english'; 
      });
    } else {
      
    }
   
  }
}
