import { Routes } from '@angular/router';
import { StarshipsComponent } from './Components/starships/starships.component';
import { StarshipComponent } from './Components/starship/starship.component';
import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuardService } from './Services/auth-guard.service';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'starships', component: StarshipsComponent, canActivate: [AuthGuardService] }, 
    { path: 'starship/:id', component: StarshipComponent, canActivate: [AuthGuardService] },
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
];

export class AppRoutingModule {}
