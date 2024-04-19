import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoeditComponent } from './projetoedit.component';

describe('ProjetoeditComponent', () => {
  let component: ProjetoeditComponent;
  let fixture: ComponentFixture<ProjetoeditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjetoeditComponent]
    });
    fixture = TestBed.createComponent(ProjetoeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
