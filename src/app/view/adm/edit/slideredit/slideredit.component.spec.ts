import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidereditComponent } from './slideredit.component';

describe('SlidereditComponent', () => {
  let component: SlidereditComponent;
  let fixture: ComponentFixture<SlidereditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlidereditComponent]
    });
    fixture = TestBed.createComponent(SlidereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
