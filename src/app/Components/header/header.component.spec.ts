import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],  
      providers: [
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
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
