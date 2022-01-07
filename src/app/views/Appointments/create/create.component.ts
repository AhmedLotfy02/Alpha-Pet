import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { OwnerAuthData, PetAuthData, VetAuthData } from 'src/app/Auth/auth-data-model';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
selected = ' ';
  selectionAlert = false;
  errorAppoint=false;
  doneAppoint=false;
  ApppointListener!: Subscription;
  
  vetArray!:VetAuthData[];
  UserListener!:Subscription;
  vetsListener!:Subscription;
  user!:OwnerAuthData;
  busyVet=false;
  constructor(private AuthService:AuthService) { 
    this.AuthService.RequestInformationsofUser();
    this.AuthService.getAllVets();
  }

  ngOnInit(): void {

    this.vetsListener=this.AuthService.getVetsListener().subscribe((response:any)=>{
      console.log(response.vetArray);
      this.vetArray=response.vetArray;
      console.log(this.vetArray);
    });
  }
  
  appoint(){
    if (this.selected === ' ') {
      this.selectionAlert = true;
      return;
    }
    this.AuthService.RequestAppointment(this.selected);
    console.log(this.selected);
  }
}
