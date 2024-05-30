import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchadenListComponent } from './schaden-list.component';

describe('SchadenListComponent', () => {
  let component: SchadenListComponent;
  let fixture: ComponentFixture<SchadenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchadenListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchadenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
