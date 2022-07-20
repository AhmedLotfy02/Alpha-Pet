import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpAsPharmacistComponent } from './sign-up-as-pharmacist.component';

describe('SignUpAsPharmacistComponent', () => {
  let component: SignUpAsPharmacistComponent;
  let fixture: ComponentFixture<SignUpAsPharmacistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpAsPharmacistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpAsPharmacistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
