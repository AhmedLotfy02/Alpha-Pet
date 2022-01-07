import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetMainPageComponent } from './vet-main-page.component';

describe('VetMainPageComponent', () => {
  let component: VetMainPageComponent;
  let fixture: ComponentFixture<VetMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VetMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VetMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
