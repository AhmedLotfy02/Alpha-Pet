import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpAsVetComponent } from './sign-up-as-vet.component';

describe('SignUpAsVetComponent', () => {
  let component: SignUpAsVetComponent;
  let fixture: ComponentFixture<SignUpAsVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpAsVetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpAsVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
