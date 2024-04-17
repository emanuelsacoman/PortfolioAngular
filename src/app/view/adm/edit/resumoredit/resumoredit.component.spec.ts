import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoreditComponent } from './resumoredit.component';

describe('ResumoreditComponent', () => {
  let component: ResumoreditComponent;
  let fixture: ComponentFixture<ResumoreditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumoreditComponent]
    });
    fixture = TestBed.createComponent(ResumoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
