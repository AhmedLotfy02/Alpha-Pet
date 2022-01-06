import { Component, OnInit } from '@angular/core';
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
  constructor(private AuthService:AuthService) { }

  ngOnInit(): void {
  }
  appoint(){
    this.AuthService.RequestAppointment(this.selected);
    console.log(this.selected);
  }

}
