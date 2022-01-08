import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { InvoiceAuthData, MedAuthData, OwnerAuthData, PharmacistAuthData } from 'src/app/Auth/auth-data-model';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-vet-main-page',
  templateUrl: './vet-main-page.component.html',
  styleUrls: ['./vet-main-page.component.css']
})
export class VetMainPageComponent implements OnInit {

  user!:PharmacistAuthData;
  UserListener!:Subscription;
  invoices!:InvoiceAuthData[];
  invoicesListener!:Subscription;
  medicines!:MedAuthData[];
  medListener!:Subscription;
  constructor(
    private authSerivce:AuthService,private router:Router
  ) { 
    this.authSerivce.RequestInformationsofPharmacistUser();
  }

  ngOnInit(): void {
    this.UserListener=this.authSerivce.getCurrentPharmacist().subscribe((response)=>{
      this.user=response;
    })
    this.invoicesListener= this.authSerivce.getInvoicesListener().subscribe((response:any)=>{
      this.invoices=response;
      console.log(response);
      console.log(this.invoices);
    })
    this.medListener=this.authSerivce.getMedicinesListener().subscribe((response)=>{
      this.medicines=response;
      console.log(this.medicines);
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
