import { Routes, RouterModule } from '@angular/router';
import { StarshipsComponent } from './Components/starships/starships.component';
import { StarshipComponent } from './Components/starship/starship.component';
import { HomeComponent } from './Components/home/home.component';
import { Component } from '@angular/core';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'starships', component: StarshipsComponent,  }, //canActivate: [authGuard]
    { path: 'starship/:id', component: StarshipComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
];

export class AppRoutingModule {}
