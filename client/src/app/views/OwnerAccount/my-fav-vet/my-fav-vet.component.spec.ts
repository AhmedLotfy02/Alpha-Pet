import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFavVetComponent } from './my-fav-vet.component';

describe('MyFavVetComponent', () => {
  let component: MyFavVetComponent;
  let fixture: ComponentFixture<MyFavVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFavVetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFavVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
