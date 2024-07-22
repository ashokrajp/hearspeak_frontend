import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {



  isSubmitted: boolean = false;
  signupForm!: FormGroup;
  constructor(public formBuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {

    this.signupForm = this.formBuilder.group({

      email: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$')])],
      password: ['', Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@#$!%*?&])[A-Za-z\d$@$!%*?&].{3,}')])],
      name:['',Validators.required]
      
    })


  }


  get errorControl(): any {
    return this.signupForm.controls;
  }
  submitForm(): any {
    this.isSubmitted = true;
    if (!this.signupForm.valid) {
      return false;
    } else {
    
      this.authService.signup(this.signupForm.value).subscribe((data: any) => {
        
        if (data.code == 1) {
          this.router.navigateByUrl('/login')
          Swal.fire({
            toast: true, position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            title: data.message,
            icon: 'success'
          })
          localStorage.setItem('token', data.data[0].token)
          //  this.authService.storeNotPermissionData()


        } else {
          Swal.fire({
            toast: true, position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            title: data.message,
            icon: 'error'
          })
        }
      })
    }
  }
}
