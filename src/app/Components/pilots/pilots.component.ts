import { Component, Input } from '@angular/core';
import { forkJoin } from 'rxjs';
import { GetStarshipService } from '../../Services/get-starship.service';
import { Pilot } from '../../models/pilots.model';


@Component({
  selector: 'app-pilots',
  standalone: true,
  imports: [],
  templateUrl: './pilots.component.html',
  styleUrl: './pilots.component.scss'
})
export class PilotsComponent {

  @Input() pilotUrls: string[] = [];
  pilots: Pilot[] = [];
  errorMessage: string | null = null;

  constructor(
    private getStarshipsService: GetStarshipService
  ) {}

  ngOnInit() {
    if (this.pilotUrls.length === 0) return;

    const pilotObservables = this.pilotUrls.map(url =>
      this.getStarshipsService.getPilot(url)
    );

    forkJoin(pilotObservables).subscribe({
      next: (pilots) => {
        this.pilots = pilots.filter((pilot): pilot is Pilot => !!pilot);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load pilot details';
        console.error(error);
      }
    });
  }

  getPilotImageUrl(id: number): string {
      return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
  }

  getPilotIdFromUrl(url: string): number {    
    return parseInt(url.split('/').filter(Boolean).pop() || '0', 10);
  }
 
}
