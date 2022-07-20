import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
   startingSnack = false;

  selectionAlert = false;
  UserListener!:Subscription;
  PetListener!:Subscription;
  PetFoundListener!:Subscription;
  user!:OwnerAuthData;
  petEditedListener!:Subscription;
  pet!: PetAuthData;
  petFound:Boolean=false;
  doneEditing=false;
  constructor(private authService:AuthService,private router:Router,    private _snackBar: MatSnackBar
    ) {
    this.authService.RequestInformationsofUser();
   

   }
   openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
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
    this.petEditedListener = this.authService.getPetEditedListener().subscribe((data) => {
      this.startingSnack = data;
      if (this.startingSnack) {
        this.openSnackBar('Operation Done Successfully', 'Close');
      }
    });

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

  gotoInform(){
    this.router.navigate(['/Account/MyInformation']);

  }
  gotoMyPet(){
    this.router.navigate(['/Account/MyPet']);

  }
  gotoMyFavVet(){
    this.router.navigate(['/Account/MyFavVet']);

  }
  gotoMyInvoices(){
    this.router.navigate(['/Account/MyInvoices']);

    
  }
  
  GoHome(){
    this.router.navigate(['/Home']);
  }
  goTorequestAppoint(){
    this.router.navigate(['/Request-Appointment']);

    
  }

}
