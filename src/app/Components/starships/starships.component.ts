import { Component, OnInit, HostListener } from '@angular/core';
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
  isLoading = false;
  currentPage: number = 1;
  finalPage: number = 4;

  constructor(private getStarshipService: GetStarshipService, private router: Router) {}

 
  ngOnInit(): void {
    this.loadStarships();
  }

  loadStarships(): void {
    if (this.isLoading) return; 
    this.isLoading = true;

    this.getStarshipService.getStarships(this.currentPage).subscribe({
      next: (data) => {
        this.starships = [...this.starships, ...data]; 
        this.currentPage++; 
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
      complete: () => {
        this.isLoading = false;
        console.log('Completed');
      }
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrollPosition = scrollTop + clientHeight;

    if (scrollPosition >= scrollHeight - 100 && this.currentPage <= this.finalPage) {
      this.loadStarships(); 
    }
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
