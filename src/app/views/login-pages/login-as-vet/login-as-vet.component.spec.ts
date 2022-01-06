import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAsVetComponent } from './login-as-vet.component';

describe('LoginAsVetComponent', () => {
  let component: LoginAsVetComponent;
  let fixture: ComponentFixture<LoginAsVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAsVetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAsVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
