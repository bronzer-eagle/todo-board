import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinBtnComponent } from './spin-btn.component';

describe('SpinBtnComponent', () => {
  let component: SpinBtnComponent;
  let fixture: ComponentFixture<SpinBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
