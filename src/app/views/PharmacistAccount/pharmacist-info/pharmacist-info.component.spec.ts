import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistInfoComponent } from './pharmacist-info.component';

describe('PharmacistInfoComponent', () => {
  let component: PharmacistInfoComponent;
  let fixture: ComponentFixture<PharmacistInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacistInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
