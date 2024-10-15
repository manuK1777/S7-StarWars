import { Routes, RouterModule } from '@angular/router';
import { StarshipsComponent } from './Components/starships/starships.component';
import { StarshipComponent } from './Components/starship/starship.component';

export const routes: Routes = [
    //{ path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'starships', component: StarshipsComponent,  }, //canActivate: [authGuard]
    { path: 'starship/:id', component: StarshipComponent }
];

export class AppRoutingModule {}

// export const AppRoutingModule = RouterModule.forRoot(routes);