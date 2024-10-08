import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GetStarshipService {

  private apiUrl = 'https://swapi.dev/api/starships';

  constructor(private http: HttpClient) {}

  getStarship(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.results.map((starship: any) => ({
        name: starship.name,
        model: starship.model
      })))
    );
  }
}
