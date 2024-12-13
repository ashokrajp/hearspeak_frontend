import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeComponent } from './component/home/home.component';
import { ChatComponent } from './component/chat/chat.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ErrorComponent } from './component/error/error.component';
import { AuthGuard } from 'src/auth.guard';
import { TermandconditionComponent } from './component/termandcondition/termandcondition.component';
import { AboutusComponent } from './component/aboutus/aboutus.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  { path: 'dashboard', component: DashboardComponent, },
  { path: 'home', component: HomeComponent ,},
  { path: 'chat', component: ChatComponent ,canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'termandcondtion', component: TermandconditionComponent },
  { path: 'aboutus', component: AboutusComponent },
  {
    path: 'error', 
    component: ErrorComponent,
    data: {
      'type': 404,   
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
