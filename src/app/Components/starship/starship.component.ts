import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GetStarshipService } from '../../Services/get-starship.service';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-starship',
  standalone: true,
  imports: [ CommonModule, DecimalPipe ],
  templateUrl: './starship.component.html',
  styleUrl: './starship.component.scss'
})
export class StarshipComponent implements OnInit {
  starship: any;
  starshipId: number | null = null;

  constructor(private route: ActivatedRoute, private getStarshipService: GetStarshipService) {}

  ngOnInit(): void {
    this.starshipId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.starshipId) {
      this.getStarshipDetails(+this.starshipId); 
    }
  }

  getStarshipDetails(id: number): void {
    this.getStarshipService.getStarship(id).subscribe((data: any) => {
      this.starship = data;
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
