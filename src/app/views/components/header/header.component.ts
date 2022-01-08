import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated=false;
  authListenerSubs!:Subscription;
  typeListener!:Subscription;
  ownerPage=false;
  VetPage=false;
  PharmacistPage=false;
  constructor(private authSerivce :AuthService,private router:Router) { 
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isAuthenticated = this.authSerivce.getisAuth();
      this.authListenerSubs = this.authSerivce
        .getAuthStatusListener()
        .subscribe((isauthenticated) => {
          this.isAuthenticated = isauthenticated;
          console.log(this.isAuthenticated);
        });
      
      this.VetPage=this.authSerivce.vetPage;
      this.ownerPage=this.authSerivce.ownerPage;
      this.PharmacistPage=this.authSerivce.pharmacistpage;
    }, 1000);
  

    
    // this.typeListener=this.authSerivce.getHomeUserListener().subscribe((response)=>{
    //   this.ownerPage=response.ownerPage;
    //   this.VetPage=response.VetPage;
    //   this.PharmacistPage=response.PharmacistPage;
    // })
  }
  logout(){
    this.authSerivce.logout();
  }
  login(){
    this.authSerivce.login();
  }
  goAccount(){
    if(this.ownerPage){
      this.router.navigate(['/Account']);
    }
    else if(this.VetPage){
      this.router.navigate(['/MyPanel']);

    }
    else if(this.PharmacistPage){
      this.router.navigate(['/MyAccount']);
    }
  }
}
