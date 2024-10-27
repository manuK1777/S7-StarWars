import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Starship } from '../models/starship.model';
import { Pilot } from '../models/pilots.model';


@Injectable({
  providedIn: 'root'
})
export class GetStarshipService {

  private apiUrl = 'https://swapi.dev/api/starships/';

  constructor(private http: HttpClient) {}

  getStarships(page: number = 1): Observable<Starship[]> {
    const paginatedUrl = `${this.apiUrl}?page=${page}`;
    return this.http.get<any>(paginatedUrl).pipe(
      map(response => response.results.map((starship: any) => ({
        name: starship.name,
        model: starship.model,
        url: starship.url
      }))),

      catchError(this.handleError)
    );
  }

  getStarship(id: number): Observable<Starship> {
    return this.http.get<any>(`${this.apiUrl}/${id}/`).pipe(
      map(starship => ({
        name: starship.name,
        model: starship.model,
        cost_in_credits: starship.cost_in_credits,
        max_atmosphering_speed: starship.max_atmosphering_speed,
        manufacturer: starship.manufacturer,
        length: starship.length,
        crew: starship.crew,
        pilots: starship.pilots,
      })),
      catchError(this.handleError)
    );
  }

  getPilot(url: string): Observable<Pilot | null> {
    return this.http.get<any>(url).pipe(
      map(pilot => ({
        name: pilot.name,
        url: pilot.url
      })),
      catchError(error => {
        console.error('Pilot retrieval failed', error);
        return of(null); 
      })
    );
  }
  

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 404:
          errorMessage = `Resource not found (404): ${error.message}`;
          break;
        case 500:
          errorMessage = `Internal server error (500): ${error.message}`;
          break;
        default:
          errorMessage = `Server-side error: ${error.status} - ${error.message}`;
      }
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
}
}
