import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-login-as-vet',
  templateUrl: './login-as-vet.component.html',
  styleUrls: ['./login-as-vet.component.css']
})
export class LoginAsVetComponent implements OnInit {

  isAuthenticated = false;
  wronginput = false;
  private authListenerSubs!: Subscription;
  private loginListener!: Subscription;
  constructor(private authService:AuthService) { }
  
  ngOnInit(): void {
    this.isAuthenticated = this.authService.getisAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isauthenticated) => {
        this.isAuthenticated = isauthenticated;
      });
  
    this.loginListener = this.authService
    .getloginListener()
    .subscribe((result) => {
      this.wronginput = result;
    });
  
  }

  login(form:NgForm){

    if (form.invalid) {
      return;
    }
    console.log(form.value);
    this.authService.loginAsVet(form.value.email,form.value.password);
  }
  gotoHome(){

  }
  logout(){

  }

}
