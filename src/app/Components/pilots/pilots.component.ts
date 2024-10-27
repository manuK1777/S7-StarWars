import { Component, Input, OnInit, } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { switchMap, map, filter } from 'rxjs/operators';
import { GetStarshipService } from '../../Services/get-starship.service';
import { Starship } from '../../models/starship.model';
import { Pilot } from '../../models/pilots.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-pilots',
  standalone: true,
  imports: [],
  templateUrl: './pilots.component.html',
  styleUrl: './pilots.component.scss'
})
export class PilotsComponent {

  starship: Starship | null = null;
  pilots: Pilot[] = [];
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

        if (!starship.pilots || starship.pilots.length === 0) {
          return of([]); 
        }

        const pilotObservables = starship.pilots.map(pilotUrl =>
          this.getStarshipsService.getPilot(pilotUrl)
        );

        return forkJoin(pilotObservables);
      })
    ).subscribe({
      next: (pilots) => {
        this.pilots = pilots.filter((pilot): pilot is Pilot => !!pilot);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load starship or pilot details';
        console.error(error);
      }
    });
  }

  getPilotImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/vieraboschkova/swapi-gallery/main/docs/static/assets/img/people/${id}.jpg`;
  }

  getPilotIdFromUrl(url: string): number {    
    return parseInt(url.split('/').filter(Boolean).pop() || '0', 10);
  }
 
}
