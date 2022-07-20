import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
  }
 
  
  gotoLoginPharma(){
    this.router.navigate(['/Login-As-Pharmacist']);

  }
  gotoLoginVet(){
    this.router.navigate(['/Login-As-Vet']);
    
  }
  gotoLoginOwner(){
    this.router.navigate(['/Login-As-Owner']);

  }
  gotoSignupOwner(){
    this.router.navigate(['/Sign-UpAsOwner']);

  }
  gotoSignupPharma(){
    this.router.navigate(['/Sign-UpAsPharmacist']);

  }
  gotoSignupVet(){
    this.router.navigate(['/Sign-UpAsVet']);

  }

}
