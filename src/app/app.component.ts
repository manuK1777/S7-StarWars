import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./Components/header/header.component";
import { StarshipsComponent } from "./Components/starships/starships.component";
import { registerLocaleData, CommonModule } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { HttpClient } from '@angular/common/http';

registerLocaleData(localeEs);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, HeaderComponent, StarshipsComponent, CommonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  title = 'S7-StarWars';

isHomePage: boolean = false;

constructor(private router: Router) {

  this.router.events.subscribe(() => {
    this.isHomePage = this.router.url === '/home'; 
  });
}

}
