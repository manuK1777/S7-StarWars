import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { FilmsComponent } from './films.component';
import { of, BehaviorSubject } from 'rxjs';
import { GetStarshipService } from '../../Services/get-starship.service'; 


describe('FilmsComponent', () => {
  let component: FilmsComponent;
  let fixture: ComponentFixture<FilmsComponent>;
  let mockParamMap = new BehaviorSubject<ParamMap>(convertToParamMap({ id: '123' }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmsComponent],
      providers: [
        provideHttpClient(),  
        GetStarshipService,  
        {
          provide: ActivatedRoute,
          useValue: { paramMap: mockParamMap.asObservable() }  
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
