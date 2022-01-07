import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OwnerAuthData, PetAuthData } from 'src/app/Auth/auth-data-model';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-my-pet',
  templateUrl: './my-pet.component.html',
  styleUrls: ['./my-pet.component.css']
})
export class MyPetComponent implements OnInit {
   selected = ' ';
  selectionAlert = false;
  UserListener!:Subscription;
  PetListener!:Subscription;
  PetFoundListener!:Subscription;
  user!:OwnerAuthData;
  
  pet!: PetAuthData;
  petFound:Boolean=false;
  doneEditing=false;
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
      console.log(response);
      this.petFound=response;
      console.log(this.petFound);
    })

  }
  changePet(form:NgForm){
    if(form.invalid){
      return;
    }
    console.log(form.value);
    this.authService.changePet(form.value.petName,form.value.petAge,form.value.petColor);
  }

  enterPet(form:NgForm){
    if(form.invalid){
      return;
    }
    console.log(form.value);
    this.authService.AddPet(form.value.petName,form.value.petAge,form.value.petColor);
  
  }

 
}
