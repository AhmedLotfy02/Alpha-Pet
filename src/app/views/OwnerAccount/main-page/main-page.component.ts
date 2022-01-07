import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { OwnerAuthData } from 'src/app/Auth/auth-data-model';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  user!:OwnerAuthData;
  UserListener!:Subscription;
  constructor(
    private authSerivce:AuthService,private router:Router
  ) { }

  ngOnInit(): void {
    this.UserListener=this.authSerivce.getCurrentOwner().subscribe((response)=>{
      this.user=response;
    })
  
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
  
}
