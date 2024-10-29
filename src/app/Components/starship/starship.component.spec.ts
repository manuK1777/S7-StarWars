import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { StarshipComponent } from './starship.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('StarshipComponent', () => {
  let component: StarshipComponent;
  let fixture: ComponentFixture<StarshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { 
          provide: ActivatedRoute, 
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '123' }) } }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
