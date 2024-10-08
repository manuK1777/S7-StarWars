import { Routes, RouterModule } from '@angular/router';
import { StarshipsComponent } from './Components/starships/starships.component';

export const routes: Routes = [
   // { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'starships', component: StarshipsComponent,  }, //canActivate: [authGuard]
];

export class AppRoutingModule {}

// export const AppRoutingModule = RouterModule.forRoot(routes);