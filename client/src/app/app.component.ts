import { Component, OnInit } from '@angular/core';
import { AuthService } from './Auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Alpha-Pet';
  constructor(private authService:AuthService) {}
  ngOnInit() {
    setTimeout(() => {
      this.authService.autoAuthUser();

    }, 1000);
  }
}
