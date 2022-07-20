import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAsPharmacistComponent } from './login-as-pharmacist.component';

describe('LoginAsPharmacistComponent', () => {
  let component: LoginAsPharmacistComponent;
  let fixture: ComponentFixture<LoginAsPharmacistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAsPharmacistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAsPharmacistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
