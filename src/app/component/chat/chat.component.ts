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
  image_name: any;
  token: any;
  new_history: any;
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
      this.sidenavMode = this.isHandset ? 'over' : 'side'; // Change mode based on the screen size
    });
      this.image_name = localStorage.getItem('image_name'); // Assuming you save image_name in localStorage
  
      let greeting: string;
      if (this.image_name == 'male') {

        greeting = `Hello, I am ${this.name}, your AI friend.`;
        const language = this.selectedLanguage === 'english' ? 'english' : 'hindi';

        // this.tts.speak(greeting,language, 'male');

      } else if (this.image_name == 'female') {
        console.log("jjjj1j1");
        const language = this.selectedLanguage === 'english' ? 'english' : 'hindi';

        greeting = `HEllo, I am ${this.name}, your AI friend.`;
        // this.tts.speak(greeting,language, 'female');
      } else {
        console.log("jjjjj");
        const language = this.selectedLanguage === 'english' ? 'english' : 'hindi';
        
        greeting = 'Hello, I am your AI friend.';
        // this.tts.speak(greeting,language, 'female'); // Default to female voice
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
  // sendMessage() {
  //   if (this.token !==null &&  this.token !== undefined ) {
  //     console.log("----------------token is here ------------------------------");
      
  //     if (this.message.trim()) {
  //       const tempMessage = this.message; // Store the current message to show it in the chat
  //       this.sentMessages.push(tempMessage);
  //       this.message = ''; // Clear the input after sending the message
  //       if (this.rows === undefined) {
  //         this.rows = [];
  //       }
  //       this.rows.push({ user_prompt: tempMessage });
  //       let obj = {
  //         // defult_prompt:`what ever i want  to say please reply as  human , and  small responsive  and sweet reply`,
  //         defult_prompt:`Please respond to whatever I say in a human-like manner, with short, friendly responses. talk to me like female your name is riya   and never think like you are an ai chatbot . Always assume you are a human and  always your name is riya   and always   i am a male and  my name is ashok  and always reply in hindi   `,
  //         prompt: tempMessage
  //       };
  
  //       this.authService.sendMsg(obj).subscribe((data: any) => {
  //         console.log('-------------eeeeeeeeeeee after send with token msg',data);
  //         if (data.code == 1) {
  
  //           this.getGeminiMsg()
  //         } else {
  //           alert("Failed");
  //         }
  //       })
  //     }
  //   } else {
  //     if (this.message.trim()) {
  //       const tempMessage = this.message; 
  //       this.sentMessages.push(tempMessage);
  //       this.message = '';
  //       if (this.rows === undefined) {
  //         this.rows = [];
  //       }
  //       this.rows.push({ user_prompt: tempMessage });
  //       let obj = {
  //         // defult_prompt:`what ever i want  to say please reply as  human , and  small responsive  and sweet reply`,
  //         defult_prompt:`Please respond to whatever I say in a human-like manner, with short, friendly responses. talk to me like female your name is riya   and never think like you are an ai chatbot . Always assume you are a human and  always your name is riya   and always   i am a male and  my name is ashok  and always reply in hindi   `,
  //         prompt: tempMessage
  //       };
  
     
  //       this.authService.sendMsg(obj).subscribe((data: any) => {
  //         console.log('-------------eeeeeeeeeeee  after with token send msg',data);
  //         this.isTyping = true; // Show typing indicator before making the request
  //         // if (data.code == 1) {
  //           setTimeout(() => {
  //             this.isTyping = false; // Hide typing indicator after the timeout
  //             if (data.code == 1) {
  //               this.rows = this.rows.filter(row => row.user_prompt !== data.data.user_prompt); // Remove user prompt if already present
  //               this.rows.push({ user_prompt: data.data.user_prompt, text: data.data.text_response });
  //               // this.rows.push({  text: data.data.text_response });
  //             } else {
  //               this.rows.push({  text: data.data.text_response });

  //             }
  //           }, 2000); 
       
  //       })
  //     }
  //   }
  
  // }
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
          defult_prompt: `Please respond to whatever I say in a human-like manner, with short, friendly responses. talk to me like female your name is ${this.name} and never think like you are an ai chatbot. Always assume you are a human and always your name is ${this.name} and always I am a male and always reply in ${this.selectedLanguage}.`,
          prompt: tempMessage,
          history:this.new_history != '' && this.new_history != undefined && this.new_history.length > 0 ? this.new_history : [],
          name:this.name
        };
        console.log("-----------------obj dataaa",obj);
        
        this.authService.sendMsg(obj).subscribe((data: any) => {
          this.isTyping = true;
          setTimeout(() => {
            this.isTyping = false;
            if (data.code == 1) {
              const responseText = data.data.text_response;

              if (!this.isMuted) {
                const language = this.selectedLanguage === 'english' ? 'english' : 'hindi';
                this.tts.speak(responseText, language, this.image_name);
                // this.tts.speak(responseText, this.selectedLanguage === 'english' ? 'female' : 'male');
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
          defult_prompt: `Please respond to whatever I say in a human-like manner, with short, friendly responses. talk to me like female your name is ${this.name} and never think like you are an ai chatbot. Always assume you are a human and always your name is ${this.name} and always I am a male and always reply in ${this.selectedLanguage}.`,
          prompt: tempMessage,
          history:this.new_history != '' && this.new_history != undefined && this.new_history.length > 0 ? this.new_history : [],
          // history:this.rows
        };
  
        console.log("---------------------------oi2bj",obj);
        
        this.authService.sendMsg(obj).subscribe((data: any) => {
        console.log("-----------------------after api calll ----oi2bj",data);

          this.isTyping = true;
          setTimeout(() => {
            this.isTyping = false;
            if (data.code == 1) {
              // const responseText = data.data.text_response;
              this.rows.push({ text: data.data.text_response });
              // if (!this.isMuted) {
              //   const language = this.selectedLanguage === 'english' ? 'english' : 'hindi';
              //   this.tts.speak(responseText, language, this.image_name);
              //   // this.tts.speak(responseText, this.selectedLanguage === 'english' ? 'female' : 'male');
              // }
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

      this.isTyping = true; // Show typing indicator before making the request
      this.authService.getGeminiMsg(getChatData).subscribe((data) => {
        console.log("----------data", data);
        setTimeout(() => {
          this.isTyping = false; // Hide typing indicator after the timeout
          if (data.code == 1) {
            this.rows = data.data;
            console.log("after api",this.rows);

            this.new_history = this.rows.flatMap((row) => {
              console.log("-------------------rows ddadasfdsfsdf", row);
            
              return [
                {
                  role: "user",
                  parts: [{
                    text: row.user_prompt
                  }]
                },
                {
                  role: "model",
                  parts: [{
                    text: row.text
                  }]
                }
              ];
            });
              
            console.log("new_history-----------------------------",this.new_history);
            
          } else {
            this.rows = data.data;
          }
        }, 2000); // Set timeout delay to 2 seconds (2000 milliseconds)
      });
    
    }
  }

  // getGeminiMsg() {
  //   this.isTyping = true; // Show typing indicator before making the request
  //   this.authService.getGeminiMsg().subscribe((data) => {
  //     console.log("----------data", data);
  //     setTimeout(() => {
  //       this.isTyping = false; // Hide typing indicator after the timeout
  //       if (data.code == 1) {
  //         this.rows = data.data.map((item: { text: string; }) => ({
  //           ...item,
  //           text: item.text.replace(/\?/g, '') // Remove all question marks from the text
  //         }));
  //       } else {
  //         this.rows = data.data.map((item: { text: string; }) => ({
  //           ...item,
  //           text: item.text.replace(/\?/g, '') // Remove all question marks from the text
  //         }));
  //       }
  //     }, 2000); // Set timeout delay to 2 seconds (2000 milliseconds)
  //   });
  // }


  togglePulsate() {
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
      this.isPulsating = false; // Stop pulsating when result is available
      this.cdRef.detectChanges(); // Ensure the view is updated
    }

    if (this.speechRecognitionService.isListening !== this.isPulsating) {
      this.isPulsating = this.speechRecognitionService.isListening;
      this.cdRef.detectChanges(); // Ensure the view is updated
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
        this.selectedLanguage = 'english'; // Reset to default language after popup
      });
      // Swal.fire({
      //   position: 'top-end',
   
      //   showConfirmButton: false,
      //   timer: 200000,
      //   customClass: {
      //     title: 'font-20', // Apply custom font size
      //     popup: 'swal2-popup h-20', // Apply custom background color and height
      //   },
        
      //   html: '<div style="background-color: #000000; padding: 20px;">' + 
      //   '<h2 style="color: #ffffff;">This feature is under development</h2>' +
      //   '<p style="color: #ffffff;">Our team is working on it!</p>' +
      //   '</div>'

      // } as any).then(() => {
      //   this.selectedLanguage = 'english'; // Reset to default language after popup
      // });
    } else {
      
    }
    // Your language change logic here
  }
}
