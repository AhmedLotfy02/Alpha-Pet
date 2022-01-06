import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-login-as-pharmacist',
  templateUrl: './login-as-pharmacist.component.html',
  styleUrls: ['./login-as-pharmacist.component.css']
})
export class LoginAsPharmacistComponent implements OnInit {
  isAuthenticated = false;
  wronginput = false;
  private authListenerSubs!: Subscription;
  private loginListener!: Subscription;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.loginListener = this.authService
    .getloginListener()
    .subscribe((result) => {
      this.wronginput = result;
    });
  this.isAuthenticated = this.authService.getisAuth();
  this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe((isauthenticated) => {
      this.isAuthenticated = isauthenticated;
    });

  }

  login(form:NgForm){

    if (form.invalid) {
      return;
    }
    console.log(form.value);
    this.authService.loginAsPharmacist(form.value.email,form.value.password);
  }
  gotoHome(){

  }
  logout(){

  }

}
