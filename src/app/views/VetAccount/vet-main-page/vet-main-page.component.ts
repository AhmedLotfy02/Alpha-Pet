import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { AppointmentAuthData, InvoiceAuthData, MedAuthData, OwnerAuthData, PharmacistAuthData, VetAuthData } from 'src/app/Auth/auth-data-model';
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
  constructor(
    private authSerivce:AuthService,private router:Router
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
   
  
  }
  gotoaddMed(){
    this.router.navigate(['MyAccount/AddMedicine']);
  }
  refuseInvoice(invoice:InvoiceAuthData){
    this.authSerivce.refuseInvoice(invoice);
  }
  AcceptInvoice(invoice:InvoiceAuthData){
    this.authSerivce.acceptInvoice(invoice);
  }
}
