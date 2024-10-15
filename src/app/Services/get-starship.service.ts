import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GetStarshipService {

  private apiUrl = 'https://swapi.dev/api/starships/';

  constructor(private http: HttpClient) {}

  getStarships(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.results.map((starship: any) => ({
        name: starship.name,
        model: starship.model,
        url: starship.url
      }))),

      catchError(this.handleError)
    );
  }

  getStarship(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`).pipe(
      map(starship => ({
        name: starship.name,
        model: starship.model,
        cost_in_credits: starship.cost_in_credits,
        atmospheric_speed: starship.max_atmosphering_speed,
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
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    
    console.error(errorMessage);  

    return throwError(() => new Error('Something went wrong, please try again later.'));
  }
}

