import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Starship } from '../models/starship.model';


@Injectable({
  providedIn: 'root'
})
export class GetStarshipService {

  private apiUrl = 'https://swapi.dev/api/starships/';

  constructor(private http: HttpClient) {}

  getStarships(): Observable<Starship[]> {
    return this.http.get<any>(this.apiUrl).pipe(
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
        crew: starship.crew
      })),
      catchError(this.handleError)
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
    
    console.error(errorMessage);  // Log the error message
  
    return throwError(() => new Error(errorMessage));
}
}
