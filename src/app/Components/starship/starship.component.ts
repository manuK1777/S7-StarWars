import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GetStarshipService } from '../../Services/get-starship.service';
import { DecimalPipe } from '@angular/common';
import { PilotsComponent } from "../pilots/pilots.component";
import { FilmsComponent } from "../films/films.component";
import { Starship } from '../../models/starship.model';


@Component({
  selector: 'app-starship',
  standalone: true,
  imports: [CommonModule, DecimalPipe, PilotsComponent, FilmsComponent],
  templateUrl: './starship.component.html',
  styleUrl: './starship.component.scss'
})
export class StarshipComponent implements OnInit {
  starship: any;
  starshipId: number | null = null;
  isLoading = false;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private getStarshipService: GetStarshipService) {}

  ngOnInit(): void {
    this.starshipId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.starshipId) {
      this.getStarshipDetails(+this.starshipId); 
    }
  }

  getStarshipDetails(id: number): void {
    this.isLoading = true;
    this.getStarshipService.getStarship(id).subscribe({
      next: (data: Starship) => {
        this.starship = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching starship:', error);
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  getImageUrl(): string {
    return `https://starwars-visualguide.com/assets/img/starships/${this.starshipId}.jpg`;
  }
 
formatCostInCredits(cost: string): string {
  if (typeof cost === 'string' && cost.match(/^\d+(\.\d+)?$/)) {
    return parseInt(cost).toLocaleString();
  } else {
    return cost;
  }
}

}
