import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterLink, RouterOutlet, RouterLinkActive, CommonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  isActiveHome: any;
  router: any;
  crawlElement: HTMLElement | null = null;

  ngAfterViewInit() {
    this.crawlElement = document.getElementById('crawl'); 

    this.crawlElement?.addEventListener('animationend', () => {
      this.crawlElement?.classList.add('crawl-2');
    });
  }
  
}

