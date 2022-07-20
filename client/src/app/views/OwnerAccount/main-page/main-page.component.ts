import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { AppointmentAuthData, OwnerAuthData } from 'src/app/Auth/auth-data-model';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  user!:OwnerAuthData;
  UserListener!:Subscription;
  appointsListener!:Subscription;
  appoints!:AppointmentAuthData[];
  startingSnack=false;
  choiceAppointListener!:Subscription;
  
  constructor(
    private authSerivce:AuthService,private router:Router,private _snackBar: MatSnackBar
  ) { 
    this.authSerivce.RequestInformationsofUser();
  }

  ngOnInit(): void {
    this.UserListener=this.authSerivce.getCurrentOwner().subscribe((response)=>{
      this.user=response;
    })
    this.appointsListener=this.authSerivce.getappoinstofownerListener().subscribe((response)=>{
      this.appoints=response;
    })
    this.choiceAppointListener=this.authSerivce.getdeleteAppointbyOwnerListener().subscribe((response)=>{
      this.startingSnack=response;
      if (this.startingSnack) {
        this.openSnackBar('Done Deleting Please Reload', 'Close');
        }
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
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
  goTorequestAppoint(){
    this.router.navigate(['/Request-Appointment']);

    
  }
  deleteAppoint(appoint:AppointmentAuthData){
    this.authSerivce.deleteAppointmentbyOwner(appoint);
  }
 
  GoHome(){
    this.router.navigate(['/Home']);
  } 
}
