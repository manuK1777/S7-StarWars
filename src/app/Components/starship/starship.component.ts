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
  setImageSrc(event: any, starshipId: number) {

    const missingStarshipImages: Record<number, string> = {
      2: 'assets/img/2_crv90_corvette.jpg',
      3: 'assets/img/3_Star-Destroyer.jpg',
      13: 'assets/img/13_TIE_Advanced.jpg',
      17: 'assets/img/17_rebel_transport.jpg'
    } 

    if ([2, 3, 13, 17].includes(starshipId)) {
      event.target.src = missingStarshipImages[starshipId];
    } else {
      event.target.src = this.getImageUrl();
    }
  }

}
