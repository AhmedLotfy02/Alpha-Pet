import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
selected = ' ';
  selectionAlert = false;
  VetArray=[
    "ahmed","hamdy","asd","asda"
  ]
  errorAppoint=false;
  doneAppoint=false;
  ApppointListener!: Subscription;
  constructor(private AuthService:AuthService) { }

  ngOnInit(): void {

  }
  appoint(){
    if (this.selected === ' ') {
      this.selectionAlert = true;
      return;
    }
    this.AuthService.RequestAppointment(this.selected);
    console.log(this.selected);
  }

}
