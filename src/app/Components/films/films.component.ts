import { Component, Input } from '@angular/core';
import { forkJoin } from 'rxjs';
import { GetStarshipService } from '../../Services/get-starship.service';
import { Film } from '../../models/films.model';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss'
})
export class FilmsComponent {

  @Input() filmUrls: string[] = [];
  films: Film[] = [];
  errorMessage: string | null = null;

  constructor(
    private getStarshipsService: GetStarshipService
  ) {}

  ngOnInit() {
    if (this.filmUrls.length === 0) return;

    const filmObservables = this.filmUrls.map(url =>
      this.getStarshipsService.getFilm(url)
    );

    forkJoin(filmObservables).subscribe({
      next: (films) => {
        this.films = films.filter((film): film is Film => !!film);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load film details';
        console.error(error);
      }
    });
  }

  getFilmImageUrl(id: number): string {
    return `https://starwars-visualguide.com/assets/img/films/${id}.jpg`;
  }

  getFilmIdFromUrl(url: string): number {    
    return parseInt(url.split('/').filter(Boolean).pop() || '0', 10);
  }
 
}
