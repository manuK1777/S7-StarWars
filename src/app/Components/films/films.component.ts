import { Component } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GetStarshipService } from '../../Services/get-starship.service';
import { Starship } from '../../models/starship.model';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../../models/films.model';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss'
})
export class FilmsComponent {

  starship: Starship | null = null;
  films: Film[] = [];
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private getStarshipsService: GetStarshipService
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const starshipId = +params.get('id')!;
        return this.getStarshipsService.getStarship(starshipId);
      }),
      switchMap(starship => {
        this.starship = starship;

        if (!starship.films || starship.films.length === 0) {
          return of([]); 
        }

        const filmObservables = starship.films.map((filmUrl: string) =>
          this.getStarshipsService.getFilm(filmUrl)
        );

        return forkJoin(filmObservables);
      })
    ).subscribe({
      next: (films: (Film | null)[]) => {
        this.films = films.filter(film => film !== null) as Film[];
      },
      error: (error) => {
        this.errorMessage = 'Failed to load starship or film details';
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
