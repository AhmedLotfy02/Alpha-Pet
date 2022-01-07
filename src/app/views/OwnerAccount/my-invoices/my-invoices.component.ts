import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { InvoiceAuthData, OwnerAuthData } from 'src/app/Auth/auth-data-model';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-my-invoices',
  templateUrl: './my-invoices.component.html',
  styleUrls: ['./my-invoices.component.css']
})
export class MyInvoicesComponent implements OnInit {

  user!:OwnerAuthData;
  UserListener!:Subscription;
  changingListener!: Subscription;
  passchanged = false;
  passchangingfailed = false;
  showpass = false;
  panelOpenState = false;
  matching = true;
  invoicesListener!:Subscription;
  invoices!:InvoiceAuthData[];
  invoice1!:InvoiceAuthData;
  constructor(
    private authSerivce:AuthService,private router:Router
  ) { 
    //this.authSerivce.getInvoicesOfOwner();
    
    this.authSerivce.RequestInformationsofUser();
  }

  ngOnInit(): void {
    this.invoicesListener= this.authSerivce.getInvoicesListener().subscribe((response:any)=>{
      this.invoices=response;
      console.log(response);
      console.log(this.invoices);
      this.invoice1=response[0];
    })
    this.UserListener=this.authSerivce.getCurrentOwner().subscribe((response)=>{
      this.user=response;
    })
   
  
  }
  gotoInform(){
    this.router.navigate(['/Account/MyInformation']);

  }
}
