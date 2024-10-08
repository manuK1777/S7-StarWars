import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  title = 'S7-StarWars';

  // starships: any[] = [];

  // constructor(private getStarshipService: GetStarshipService) {}

  // ngOnInit(): void {
  //   this.getStarshipService.getStarship().subscribe((data) => {
  //     this.starships = data;
  //   });
  // }
}
