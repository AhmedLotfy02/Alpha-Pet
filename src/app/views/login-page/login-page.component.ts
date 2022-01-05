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
  onlogging(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
    if (form.value.username === 'admin' && form.value.password === 'admin') {
      this.router.navigate(['/admin/options']);
    } else {
      this.authService.login(form.value.username, form.value.password);
    }
  }

}
