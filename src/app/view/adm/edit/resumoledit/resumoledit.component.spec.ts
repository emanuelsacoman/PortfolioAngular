import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoleditComponent } from './resumoledit.component';

describe('ResumoleditComponent', () => {
  let component: ResumoleditComponent;
  let fixture: ComponentFixture<ResumoleditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumoleditComponent]
    });
    fixture = TestBed.createComponent(ResumoleditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
