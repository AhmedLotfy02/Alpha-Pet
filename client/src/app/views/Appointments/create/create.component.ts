import { Component, OnInit } from '@angular/core';
import { now } from 'mongoose';

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
  busyListener!:Subscription;
  dateValidation=false;
  timeValidation=false;
  doneAddingListener!:Subscription;
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
    this.doneAddingListener=this.AuthService.getAppointAddedListener().subscribe((response)=>{
      this.doneAppoint=response.doneadding;
      this.errorAppoint=response.notadded;
    },(error)=>{
     
      this.errorAppoint=true;
    })

  }
  
  appoint(){
    if (this.selected === ' ') {
      this.selectionAlert = true;
      return;
    }
    
    const inputElement = document.getElementById("dateinput") as HTMLInputElement;
    const inputElement1 = document.getElementById("timeinput") as HTMLInputElement;
    if(inputElement.value===''){
      this.dateValidation=true;
      return ;
    }
    else if(inputElement1.value===''){
      this.dateValidation=false;
      this.selectionAlert=false;
      this.timeValidation=true;
      return;
    }
    console.log(inputElement.value);
    console.log(inputElement1.value);
    let input1=inputElement1.value.toString();
    let x=inputElement1.value.slice(0,2);
    let n=parseInt(x);
    let z=(n+1)%13;
    let s=z.toString();
    console.log(z);
    if(z<10){
      input1=s[0]+input1.slice(2,input1.length);
    }
    else{
      input1=s+input1.slice(2,input1.length);
    }
    input1=inputElement.value+'|'+input1;
    console.log(input1.toString());
    let Fulldate =inputElement.value+'|'+inputElement1.value;
    this.AuthService.RequestAppointment(this.selected,Fulldate.toString(),input1.toString());
    console.log(this.selected);
  }
}
