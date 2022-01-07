import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaMainPageComponent } from './pharma-main-page.component';

describe('PharmaMainPageComponent', () => {
  let component: PharmaMainPageComponent;
  let fixture: ComponentFixture<PharmaMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmaMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
