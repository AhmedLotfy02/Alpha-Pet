import { Component, OnInit } from '@angular/core';
import {   FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up-as-pharmacist',
  templateUrl: './sign-up-as-pharmacist.component.html',
  styleUrls: ['./sign-up-as-pharmacist.component.css']
})
export class SignUpAsPharmacistComponent implements OnInit {
 
  isAuthenticated = false;
  form!: FormGroup;
  startingSnack = false;

  imagePreview!: string;
  private authListenerSubs!:Subscription;

  constructor(  private router: Router,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder) { }
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
    } 
    console.log(this.form.value);

    // this.authService.createUser(
    //   this.form.value.email,
    //   this.form.value.password,
    //   this.form.value.username,
    //   this.form.value.image,
    //   this.form.value.mobile,
    //   this.selected
    // );
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
      PharmaID: new FormControl(null, {
        validators: Validators.compose([
          Validators.required,
        
        ]),
      }),
      LastName: new FormControl(null, {
        validators: Validators.compose([
          Validators.required,
       
        ]),
      }),
    });
    // this.authListenerSubs = this.authService.getTestData().subscribe((data) => {
    //   this.startingSnack = data.failed;
    //   if (this.startingSnack) {
    //     this.openSnackBar('SignUp Failed', 'Close');
    //   }
    // });
    // this.isAuthenticated = this.authService.getisAuth();

    // this.authListenerSubs = this.authService
    //   .getAuthStatusListener()
    //   .subscribe((isauthenticated) => {
    //     this.isAuthenticated = isauthenticated;
    //   });
  }
  //    const { email, password, fName, lName, pharmacy_id } = req.body;

}
