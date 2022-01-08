import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { OwnerAuthData, VetAuthData } from 'src/app/Auth/auth-data-model';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {
  user!:VetAuthData;
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
    this.authSerivce.RequestInformationsofVetUser();
  }

  ngOnInit(): void {
    this.UserListener=this.authSerivce.getVetUserListener().subscribe((response)=>{
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
    this.authSerivce.changePasswordofVet(form.value.password1, form.value.password3);
  }
  

  gotoInform(){
    this.router.navigate(['/Account/MyInformation']);

  }

  GoHome(){
    this.router.navigate(['/Home']);
  }
}
