import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OwnerAuthData, PetAuthData, VetAuthData } from 'src/app/Auth/auth-data-model';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-my-fav-vet',
  templateUrl: './my-fav-vet.component.html',
  styleUrls: ['./my-fav-vet.component.css']
})
export class MyFavVetComponent implements OnInit {
  selected = ' ';
  selectionAlert = false;
  vetArray!:VetAuthData[];
  UserListener!:Subscription;
  vetsListener!:Subscription;
  user!:OwnerAuthData;
  FavVetListener!:Subscription;
  doneEditing=false;
  constructor(private authService:AuthService) {
    this.authService.RequestInformationsofUser();
    this.authService.getAllVets();
   }

  ngOnInit(): void {
    this.UserListener=this.authService.getCurrentOwner().subscribe((response)=>{
      this.user=response;
    });
    this.vetsListener=this.authService.getVetsListener().subscribe((response:any)=>{
      console.log(response.vetArray);
      this.vetArray=response.vetArray;
      console.log(this.vetArray);
    });
    this.FavVetListener=this.authService.getFavVetListener().subscribe((response)=>{
      this.doneEditing=response;
    })
   

  }

  
  Select(){
    if (this.selected === ' ') {
      this.selectionAlert = true;
      return;
    }

   // this.authService.RequestAppointment(this.selected);
   this.authService.FavVet(this.user.Email,this.selected);
    console.log(this.selected);
  }

}
