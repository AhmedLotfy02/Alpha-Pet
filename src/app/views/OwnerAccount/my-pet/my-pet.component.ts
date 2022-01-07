import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OwnerAuthData, PetAuthData } from 'src/app/Auth/auth-data-model';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-my-pet',
  templateUrl: './my-pet.component.html',
  styleUrls: ['./my-pet.component.css']
})
export class MyPetComponent implements OnInit {
  UserListener!:Subscription;
  PetListener!:Subscription;
  PetFoundListener!:Subscription;
  user!:OwnerAuthData;
  pet!: PetAuthData;
  PetFound=true;
  constructor(private authService:AuthService) {
    this.authService.RequestInformationsofUser();
   }

  ngOnInit(): void {
    this.UserListener=this.authService.getCurrentOwner().subscribe((response)=>{
      this.user=response;
    })
    this.PetListener=this.authService.getPetOfOwner().subscribe((repsonse)=>{
      this.pet=repsonse;
    })
    this.PetFoundListener=this.authService.getPetFoundListener().subscribe((response)=>{
      this.PetFound=response;
    })

  }

}
