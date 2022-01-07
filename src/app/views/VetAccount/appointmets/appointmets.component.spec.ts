import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmetsComponent } from './appointmets.component';

describe('AppointmetsComponent', () => {
  let component: AppointmetsComponent;
  let fixture: ComponentFixture<AppointmetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
