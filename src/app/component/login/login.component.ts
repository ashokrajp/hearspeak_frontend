import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  isSubmitted: boolean = false;
  LoginForm!: FormGroup;
  constructor(public formBuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {

    this.LoginForm = this.formBuilder.group({

      email: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$')])],
      password: ['', Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@#$!%*?&])[A-Za-z\d$@$!%*?&].{3,}')])],
      
    })


  }

  submitForm(): any {
console.log("-----------hello");


    this.isSubmitted = true;
    if (!this.LoginForm.valid) {
      return false;
    } else {
    
      this.authService.login(this.LoginForm.value).subscribe((data: any) => {
        console.log("-----daata--------------------------------",data);
        
        if (data.code == 1) {
          Swal.fire({
            toast: true, position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            title: data.message,
            icon: 'success'
          })
          localStorage.setItem('token', data.data.token)
          // localStorage.setItem('name', data.data.name)
          //  this.authService.storeNotPermissionData()

          this.router.navigateByUrl('/chat')

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



  get errorControl(): any {
    return this.LoginForm.controls;
  }

}
