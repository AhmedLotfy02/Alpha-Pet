import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { AppointmentAuthData, InvoiceAuthData, MedAuthData, OwnerAuthData, PharmacistAuthData, pharmacyAuthData, VetAuthData } from 'src/app/Auth/auth-data-model';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-vet-main-page',
  templateUrl: './vet-main-page.component.html',
  styleUrls: ['./vet-main-page.component.css']
})
export class VetMainPageComponent implements OnInit {

  user!:VetAuthData;
  UserListener!:Subscription;
  AppointsListener!:Subscription;
  appoints!:AppointmentAuthData[];
  startingSnack=false;
  choiceAppointListener!:Subscription;
  pharmacies!:pharmacyAuthData[];
  pharmaciesListener!:Subscription;
  selectionAlert=false;
  selected = ' ';
  constructor(
    private authSerivce:AuthService,private router:Router,    private _snackBar: MatSnackBar,

  ) { 
    this.authSerivce.RequestInformationsofVetUser();
  }

  ngOnInit(): void {
    this.UserListener=this.authSerivce.getVetUserListener().subscribe((response)=>{
      this.user=response;
    })
    
    this.AppointsListener=this.authSerivce.getAppointmentsofVetListener().subscribe((response)=>{
      this.appoints=response;
      console.log(response);
    })
    this.pharmaciesListener=this.authSerivce.getPharmaciesListener().subscribe((response)=>{
      this.pharmacies=response;
    })


    this.choiceAppointListener=this.authSerivce.getChoiceAppoint().subscribe((response)=>{
      this.startingSnack=response;
      if (this.startingSnack) {
        this.openSnackBar('Done Please Reload', 'Close');
        }
    })
   
  
  }
  acceptAppoint(appoint:AppointmentAuthData){
    this.authSerivce.acceptAppoint(appoint);
  }
  rejectAppoint(appoint:AppointmentAuthData){
    this.authSerivce.rejectAppoint(appoint);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  CompleteAppoint(appoint:AppointmentAuthData){
    this.authSerivce.CompleteAppoint(appoint);
  }
  NeedSurgery(appoint:AppointmentAuthData){
    this.authSerivce.NeedSugery(appoint);
  }
  ShowInvoice(appoint:AppointmentAuthData){
    for(let i=0;i<this.appoints.length;i++){
      if(this.appoints[i].id==appoint.id){
        this.appoints[i].invoiceorNot=true;
      }
    }
  }
  AddInvoice(appoint:AppointmentAuthData,form:NgForm){
    if(form.invalid){
      return;
    }
    if(this.selected==' '){
      return;
    }
    console.log(form.value);
    this.authSerivce.AddInvoice(form.value.notes,appoint,form.value.price,form.value.reqmed,parseInt(this.selected));
  }

  gotoVetInfo(){
    this.router.navigate(['/MyPanel/MyInfo']);
  }
  gotovetPanel(){
    this.router.navigate(['/MyPanel']);

  }
  
  GoHome(){
    this.router.navigate(['/Home']);
  }
}
