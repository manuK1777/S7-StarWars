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

  constructor(private getStarshipService: GetStarshipService, private router: Router) {}

 
  ngOnInit(): void {
    this.getStarshipService.getStarship().subscribe((data) => {
      this.starships = data;
    });
  }
}
