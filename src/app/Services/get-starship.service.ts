import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Starship } from '../models/starship.model';
import { Pilot } from '../models/pilots.model';
import { Film } from '../models/films.model';


@Injectable({
  providedIn: 'root'
})
export class GetStarshipService {

  private apiUrl = 'https://swapi.dev/api/starships/';
  private starshipData: { [id: number]: Starship } = {};

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
    return this.http.get<any>(`${this.apiUrl}${id}/`).pipe(
      map(starship => ({
        name: starship.name,
        model: starship.model,
        cost_in_credits: starship.cost_in_credits,
        max_atmosphering_speed: starship.max_atmosphering_speed,
        manufacturer: starship.manufacturer,
        length: starship.length,
        crew: starship.crew,
        pilots: starship.pilots,
        films: starship.films,
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
      catchError((error: HttpErrorResponse) => {
        console.error('Pilot retrieval failed', error);
        return throwError(() => error);
      })
    );
  }
  
  getFilm(url: string): Observable<Film | null> {
    return this.http.get<any>(url).pipe(
      map(film => ({
        title: film.title,
        url: film.url,
        episode_id: film.episode_id
      })),
      catchError((error: HttpErrorResponse) => {
        console.error('Film retrieval failed', error);
        return throwError(() => error);
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
