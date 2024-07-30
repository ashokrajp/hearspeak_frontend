import { ChangeDetectorRef, Component } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/services/auth.service';
import { SpeechrecognitionService } from 'src/app/services/speechrecognition.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  token:any;
  name:any;


  constructor(private router: Router,private tts: TextToSpeechService, public speechRecognitionService: SpeechrecognitionService,private cdRef: ChangeDetectorRef ,public authService: AuthService) {
    this.token=localStorage.getItem('token')
    this.name = localStorage.getItem('name');

   }

  ngOnInit(): void {
    this.token=localStorage.getItem('token')
  }

  clearChat() {
  
    let clearChat={
      name:this.name
    }
    this.authService.clearChatdata(clearChat).subscribe((data) => {
      if (data.code == 1) {
        this.authService.emitClearChat(); 
      }else{

      }
  // })
// }
})
  }

  logout() {
    console.log("---------------logout");
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to logout",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.authService.logout().subscribe((data) => {
          if (data.code == 1) {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              title: data.message,
              icon: 'success'
            });
            localStorage.removeItem('token');
            // Optionally redirect or perform other cleanup after logout
            this.router.navigate(['/home']);

          } else {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              title: data.message,
              icon: 'error'
            });
          }
        });
      }
    });
  }
  
}
