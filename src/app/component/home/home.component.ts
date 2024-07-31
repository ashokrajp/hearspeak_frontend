import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InformComponent } from '../dialog/inform/inform.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  addInform: any;
  constructor(private dialog: MatDialog) { }

  openDialog(gender: string): void {
    console.log("sgender",gender);
    
    
    localStorage.setItem('image_name', gender);
    const dialogRef = this.dialog.open(InformComponent, {

    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
      }
    });
  }
}
