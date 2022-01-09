import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { OwnerAuthData, PharmacistAuthData, pharmacyAuthData, VetAuthData } from 'src/app/Auth/auth-data-model';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-pharmacist-info',
  templateUrl: './pharmacist-info.component.html',
  styleUrls: ['./pharmacist-info.component.css']
})
export class PharmacistInfoComponent implements OnInit {
  user!:PharmacistAuthData;
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
    this.authSerivce.RequestInformationsofPharmacistUser();
  }

  ngOnInit(): void {
    this.UserListener=this.authSerivce.getCurrentPharmacist().subscribe((response)=>{
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
    this.authSerivce.changePasswordofPharmacist(form.value.password1, form.value.password3);
  }
  


  GoHome(){
    this.router.navigate(['/Home']);
  }
  gotoMedicine(){
    this.router.navigate(['/MyAccount/AddMedicine']);

  }
  gotopharmacistPanel(){
    this.router.navigate(['/MyAccount']);

  }
  gotoInformation(){
    this.router.navigate(['/MyAccount/MyInfo']);

    
  }
}
