import { TestBed } from '@angular/core/testing';
import { GetStarshipService } from './get-starship.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Film } from '../models/films.model';

describe('GetStarshipService', () => {
  let service: GetStarshipService;
  let httpMock: HttpTestingController;

  const mockStarships = [
    { name: 'X-Wing', model: 'T-65 X-wing', url: 'mock-url/1' },
    { name: 'Millennium Falcon', model: 'YT-1300 light freighter', url: 'mock-url/2' }
  ];

  const mockStarshipData = {
    name: 'Death Star',
    model: 'DS-1 Orbital Battle Station',
    cost_in_credits: '1000000000000',
    max_atmosphering_speed: 'n/a',
    manufacturer: 'Imperial Department of Military Research, Sienar Fleet Systems',
    length: '120000',
    crew: '342953',
    pilots: [],
    films: ["https://swapi.dev/api/films/1/"]
  };

  const mockFilmData: Film = {
    title: 'Mock Film Title',
    url: 'https://swapi.dev/api/films/1/',
    episode_id: '1'
  };

  const mockPilotData = {
    name: 'Luke Skywalker',
    url: 'https://swapi.dev/api/people/1/'
  };

  const mockParamMap = new BehaviorSubject(convertToParamMap({ id: '123' }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetStarshipService,
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: '123' }) },
            params: of({ id: '123' })
          }
        }
      ]
    });

    service = TestBed.inject(GetStarshipService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('should retrieve a list of starships', () => {
   
    service.getStarships(1).subscribe((starships) => {
      expect(starships).toEqual(mockStarships);
    });

    const req = httpMock.expectOne('https://swapi.dev/api/starships/?page=1');
    expect(req.request.method).toBe('GET');
    req.flush({ results: mockStarships });
  });

  it('should handle a 404 error correctly', () => {
    const errorResponse = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
      error: 'Resource not found'
    });

    service.getStarship(999).subscribe({
      next: () => fail('Expected an error, but got a success response'),
      error: (error) => {
        expect(error.message).toContain('Resource not found');
      }
    });

    const req = httpMock.expectOne('https://swapi.dev/api/starships/999/');
    expect(req.request.method).toBe('GET');
    req.flush('Resource not found', { status: 404, statusText: 'Not Found' });
  });


  it('should retrieve a starship', () => {
 
    service.getStarship(9).subscribe((starship) => {
      expect(starship).toEqual(mockStarshipData);
    });

    const req = httpMock.expectOne('https://swapi.dev/api/starships/9/');
    expect(req.request.method).toBe('GET');
    req.flush(mockStarshipData); 
  });

  it('should handle a 404 error correctly', () => {
    const errorResponse = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
      error: 'Resource not found'
    });

    service.getStarship(999).subscribe({
      next: () => fail('Expected an error, but got a success response'),
      error: (error) => {
        expect(error.message).toContain('Resource not found');
      }
    });

    const req = httpMock.expectOne('https://swapi.dev/api/starships/999/');
    expect(req.request.method).toBe('GET');
    req.flush('Resource not found', { status: 404, statusText: 'Not Found' });
  });


  it('should retrieve a film', () => {
 
    service.getFilm('https://swapi.dev/api/films/1/').subscribe((film) => {
      expect(film).toEqual(mockFilmData);
    });

    const req = httpMock.expectOne('https://swapi.dev/api/films/1/');
    expect(req.request.method).toBe('GET');
    req.flush(mockFilmData); 
  });

  it('should handle a 404 error correctly', () => {
    const errorResponse = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
      error: 'Resource not found'
    });

    service.getFilm('https://swapi.dev/api/films/999/').subscribe({
      next: () => fail('Expected an error, but got a success response'),
      error: (error) => {
        expect(error.message).toContain('Http failure response for https://swapi.dev/api/films/999/: 404 Not Found');
      }
    });

    const req = httpMock.expectOne('https://swapi.dev/api/films/999/');
    expect(req.request.method).toBe('GET');
    req.flush('Resource not found', { status: 404, statusText: 'Not Found' });
  });


  it('should retrieve a pilot', () => {
 
    service.getPilot('https://swapi.dev/api/people/1/').subscribe((pilot) => {
      expect(pilot).toEqual(mockPilotData);
    });

    const req = httpMock.expectOne('https://swapi.dev/api/people/1/');
    expect(req.request.method).toBe('GET');
    req.flush(mockPilotData); 
  });

  it('should handle a 404 error correctly', () => {
    const errorResponse = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
      error: 'Resource not found'
    });

    service.getPilot('https://swapi.dev/api/people/999/').subscribe({
      next: () => fail('Expected an error, but got a success response'),
      error: (error) => {
        expect(error.message).toContain('Http failure response for https://swapi.dev/api/people/999/: 404 Not Found');
      }
    });

    const req = httpMock.expectOne('https://swapi.dev/api/people/999/');
    expect(req.request.method).toBe('GET');
    req.flush('Resource not found', { status: 404, statusText: 'Not Found' });
  });
});
