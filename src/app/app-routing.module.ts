import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { AppComponent } from './app.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:"", pathMatch: 'full', component:LandingComponent},
  {path:"login", component:LoginComponent},
  {path:"sign-up", component:SignUpComponent},
  {path:"home", component:HomeComponent},
  {path:"dashboard", component:DashboardComponent},
  {path:"user", component:UserComponent},
  {path:"user/:id", component:UserDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
