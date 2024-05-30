import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchadenDetailComponent } from './schaden-detail.component';

describe('SchadenDetailComponent', () => {
  let component: SchadenDetailComponent;
  let fixture: ComponentFixture<SchadenDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchadenDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchadenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
