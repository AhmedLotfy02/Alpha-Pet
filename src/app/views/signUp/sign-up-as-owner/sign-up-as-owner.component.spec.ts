import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpAsOwnerComponent } from './sign-up-as-owner.component';

describe('SignUpAsOwnerComponent', () => {
  let component: SignUpAsOwnerComponent;
  let fixture: ComponentFixture<SignUpAsOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpAsOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpAsOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
