import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-inform',
  templateUrl: './inform.component.html',
  styleUrls: ['./inform.component.css']
})
export class InformComponent {
  addInform!: FormGroup;
  name:any;
  age:any;
  image_name:any;
  constructor(
    public dialogRef: MatDialogRef<InformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private router: Router
  ) { }

  ngOnInit(): void {
    this.addInform = this.fb.group({
      name: ['', [Validators.required, this.onlyAlphabetValidator]],
      age: ['', Validators.required ],
     
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addProduct(): void {
    if (this.addInform.valid) {
      console.log(this.addInform.value);

      this.name=this.addInform.value.name
      this.age=this.addInform.value.age
     
          localStorage.setItem('name',  this.name);
          localStorage.setItem('age',   this.age);
       
      this.router.navigate([`/chat`])
      
      this.dialogRef.close();
    } else {
     
      this.addInform.markAllAsTouched();
    }
  }

  get registerControls() {
    return this.addInform.controls;
  }



  onlyAlphabetValidator(control: any) {
    const regex = /^[a-zA-Z]*$/;
    const valid = regex.test(control.value);
    return valid ? null : { onlyAlphabet: true };
  }
  
}
