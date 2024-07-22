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
      name: ['', Validators.required],
      age: ['', Validators.required],
      // Add more form controls as needed
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addProduct(): void {
    // Logic to handle form submission

    if (this.addInform.valid) {
      console.log(this.addInform.value);

      this.name=this.addInform.value.name
      this.age=this.addInform.value.age
      // Perform action with form data (e.g., send to backend)
          localStorage.setItem('name',  this.name);
          localStorage.setItem('age',   this.age);
       
      this.router.navigate([`/chat`])
      
      this.dialogRef.close();
    } else {
      // Handle form validation errors
      // For example, mark fields as touched to display validation messages
      this.addInform.markAllAsTouched();
    }
  }

  get registerControls() {
    return this.addInform.controls;
  }
}
