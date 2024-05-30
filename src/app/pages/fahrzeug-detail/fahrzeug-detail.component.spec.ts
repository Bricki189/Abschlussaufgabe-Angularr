import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FahrzeugDetailComponent } from './fahrzeug-detail.component';

describe('FahrzeugDetailComponent', () => {
  let component: FahrzeugDetailComponent;
  let fixture: ComponentFixture<FahrzeugDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FahrzeugDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FahrzeugDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
