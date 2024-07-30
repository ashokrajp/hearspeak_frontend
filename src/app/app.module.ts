import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HeaderComponent } from './component/common/header/header.component';
import { FooterComponent } from './component/common/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { InformComponent } from './component/dialog/inform/inform.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './component/chat/chat.component';
import { SliderComponent } from './component/slider/slider.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';


import { MatMenuModule } from '@angular/material/menu';
import { SignupComponent } from './component/signup/signup.component';
import { ToastrModule } from 'ngx-toastr';
import { ErrorComponent } from './component/error/error.component';
import { AboutusComponent } from './component/aboutus/aboutus.component';
import { TermandconditionComponent } from './component/termandcondition/termandcondition.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    InformComponent,
    ChatComponent,
    SliderComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    AboutusComponent,
    TermandconditionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
   
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
