import { Component, OnInit } from '@angular/core';
import {   FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-sign-up-as-owner',
  templateUrl: './sign-up-as-owner.component.html',
  styleUrls: ['./sign-up-as-owner.component.css']
})
export class SignUpAsOwnerComponent implements OnInit {

  selected = ' ';
  selectionAlert = false;
  isAuthenticated = false;
  form!: FormGroup;
  startingSnack = false;

  imagePreview!: string;
  private authListenerSubs!:Subscription;

  constructor(  private router: Router,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder
    ,private AuthSerivce:AuthService
    ) { }
    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action);
    }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  onSignup() {
    if (this.form.invalid || this.form.value.phone < 10) {
      return;
    } else if (this.selected === ' ') {
      this.selectionAlert = true;
      return;
    }
    console.log(this.form.value);

    console.log(this.selected);
   
    this.AuthSerivce.create_Owner_User(this.form.value.email,this.form.value.password,this.form.value.FirstName,this.form.value.image,this.form.value.phone,this.selected,this.form.value.LastName);
  }
  ngOnInit(): void {
    this.form = this._fb.group({
      email: new FormControl(null, {
        validators: Validators.compose([Validators.required, Validators.email]),
      }),
      password: new FormControl(null, {
        validators: Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ]),
      }),
      FirstName: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        // asyncValidators: [mimeType],
      }),
      phone: new FormControl(null, {
        validators: Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ]),
      }),
      LastName: new FormControl(null, {
        validators: Validators.compose([
          Validators.required,
       
        ]),
      }),
    });
    this.authListenerSubs = this.AuthSerivce.getTestData().subscribe((data) => {
      this.startingSnack = data.failed;
      if (this.startingSnack) {
        this.openSnackBar('SignUp Failed try another email or enter correct pharmacy ID', 'Close');
      }
    });
    this.isAuthenticated = this.AuthSerivce.getisAuth();

    this.authListenerSubs = this.AuthSerivce
      .getAuthStatusListener()
      .subscribe((isauthenticated) => {
        this.isAuthenticated = isauthenticated;
      });
  }
  gotoLoginOwner(){
    this.router.navigate(['/Login-As-Owner']);

  }
  gotoHome(){
    this.router.navigate(['/Home']);

  }
  logout(){
    this.AuthSerivce.logout();
  }
}
