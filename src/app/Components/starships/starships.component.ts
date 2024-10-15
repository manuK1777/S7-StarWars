import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'
import { GetStarshipService } from '../../Services/get-starship.service';

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss'
})
export class StarshipsComponent implements OnInit {

  starships: any[] = [];
  errorMessage: string = '';

  constructor(private getStarshipService: GetStarshipService, private router: Router) {}

 
  ngOnInit(): void {
    this.loadStarships();
  }

  loadStarships() {
    this.getStarshipService.getStarships().subscribe({
      next: (data) => {
        this.starships = data;
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
      complete: () => {
        console.log('Completed');
      }
    });
  }

  viewStarshipDetails(starshipUrl: string | undefined): void {

    if (starshipUrl) {
      const id = this.extractIdFromUrl(starshipUrl);
      if (id) {
        this.router.navigate(['/starship', id]);
      } else {
        console.error('Unable to extract ID from the URL:', starshipUrl);
      }
    } else {
      console.error('Starship URL is undefined or invalid');
    }
  }

  extractIdFromUrl(url: string): number | null {
    if (url) {
      const id = url.split('/').filter(Boolean).pop(); 
      return Number(id) || null; 
    }
    return null;
  }
}
