import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAsOwnerComponent } from './login-as-owner.component';

describe('LoginAsOwnerComponent', () => {
  let component: LoginAsOwnerComponent;
  let fixture: ComponentFixture<LoginAsOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAsOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAsOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
