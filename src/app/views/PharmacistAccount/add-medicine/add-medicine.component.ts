import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { InvoiceAuthData, OwnerAuthData, PharmacistAuthData } from 'src/app/Auth/auth-data-model';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit {
  user!:PharmacistAuthData;
  UserListener!:Subscription;
  invoices!:InvoiceAuthData[];
  invoicesListener!:Subscription;

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
    
  }
  AddMed(form:NgForm){
    
  }
}
