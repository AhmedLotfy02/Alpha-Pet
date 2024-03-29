import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { OwnerAuthData } from 'src/app/Auth/auth-data-model';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-my-information',
  templateUrl: './my-information.component.html',
  styleUrls: ['./my-information.component.css']
})
export class MyInformationComponent implements OnInit {
  user!:OwnerAuthData;
  UserListener!:Subscription;
  changingListener!: Subscription;
  passchanged = false;
  passchangingfailed = false;
  showpass = false;
  panelOpenState = false;
  matching = true;
  constructor(
    private authSerivce:AuthService,private router:Router
  ) { 
    this.authSerivce.RequestInformationsofUser();
  }

  ngOnInit(): void {
    this.UserListener=this.authSerivce.getCurrentOwner().subscribe((response)=>{
      this.user=response;
    })
    this.changingListener = this.authSerivce
    .getChangePassListener()
    .subscribe((data) => {
      this.passchanged = data.changed;
      this.passchangingfailed = data.failed;
    });

  
  }
  
  changePassword(form: NgForm) {
    if (form.invalid) {
      return;
    } else if (form.value.password1 !== form.value.password2) {
      this.matching = false;
      return;
    }
    console.log(form.value);
    this.authSerivce.changePasswordofOwner(form.value.password1, form.value.password3);
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
  
  GoHome(){
    this.router.navigate(['/Home']);
  }

}
