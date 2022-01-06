

   
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { check } from 'express-validator';
import { Subject } from 'rxjs';
import { signData } from '../models/signUpData-model';
import { AuthData } from './auth-data-model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private testData = new Subject<signData>();

    private token!: string;
  private userEmail!: string;
  private user!: AuthData;
  private authStatusListener = new Subject<boolean>();
  isAuthenticated = false;
  private creationListener = new Subject<boolean>();
  isCreated = false;
  private creationError = new Subject<boolean>();
  creationerror = false;
  private updationListener = new Subject<boolean>();
  isUpdated = false;
  private updationError = new Subject<boolean>();
  updationerror = false;
  private deletionListener = new Subject<boolean>();
  isdeleted = false;
  private deletionError = new Subject<boolean>();
  deletionerror = false;
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) {



    }
   
   login(username: string, password: string) {
    const authData: AuthData = {
      email: '',
      password: password,
      username: username,
      image: '',
      mobile: 0,
      gover: ' ',
     
    };
    this.http.post<{ token: string; expiresIn: number; user: AuthData }>('http://localhost:3000/login',authData)
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          console.log(response);
          if (token) {
            this.authStatusListener.next(true);
            this.isAuthenticated = true;
            const expiresInDuration = response.expiresIn;
            console.log(expiresInDuration);
            const user = response.user;
            this.user = user;
            // this.userEmail = email;
            console.log(user.email);
            console.log(this.user);
          //  this.setAuthTimer(expiresInDuration);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
          //  this.saveAuthData(token, expirationDate, user.email);
            this.router.navigate(['/mainstore']);
          }
        },
        (error) => {
         // this.loginListener.next(true);
        }
      );
  }


  create_Owner_User(
    email: string,
    password: string,
    FirstName: string,
    image: File,
    phone: number,
    city: string,
    LastName:string
  ) {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('FirstName', FirstName);
    data.append('LastName',LastName);
    data.append('phone', phone.toString());
    data.append('city', city);
    data.append('image', image, email);
    data.append('favouriteVetEmail','');
    data.append('balance','10000');
    data.forEach(element => {
      console.log(element);
    });
   
    this.http.post('http://localhost:5000/owners/signup', data).subscribe(
      (response) => {
        console.log(response);
        const data: signData = {
          isauthenticated: true,
          failed: false,
          success: true,
        };
        this.testData.next(data);
        //this.router.navigate(['/signup/signupSuccessfully']);
      },
      (error) => {
        console.log(error);
        const data: signData = {
          isauthenticated: false,
          failed: true,
          success: false,
        };
        this.testData.next(data);
      }
    );
  }
  create_Pharmacist_User(
    email: string,
    password: string,
    FirstName: string,
    image: File,
    pharmacyID: number,
    LastName:string
  ) {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('FirstName', FirstName);
    data.append('LastName',LastName);
    data.append('pharmacy_id', pharmacyID.toString());
    data.append('image', image, email);
    
    console.log('data is ' + data);

    this.http.post('http://localhost:3000/signuptest', data).subscribe(
      (response) => {
        console.log(response);
        const data: signData = {
          isauthenticated: true,
          failed: false,
          success: true,
        };
        this.testData.next(data);
        //this.router.navigate(['/signup/signupSuccessfully']);
      },
      (error) => {
        const data: signData = {
          isauthenticated: false,
          failed: true,
          success: false,
        };
        this.testData.next(data);
      }
    );
  }

  create_Vet_User(
    email: string,
    password: string,
    FirstName: string,
    image: File,
    LastName:string,
    charge:number
  ) {
    const data1 = new FormData();
    data1.append('email', email);
    data1.append('password', password);
    data1.append('fName', FirstName);
    data1.append('lName',LastName);
    data1.append('image', image, email);
    data1.append('state','0');
    data1.append('charge',charge.toString());
    data1.forEach(element => {
      console.log(element);
    });
    // console.log('data is ' + data);
// const obj={
//   'email': email,
//   'password': password,
//   'fName': FirstName,
// }
    this.http.post('http://localhost:5000/vets/signup', data1).subscribe(
      (response) => {
        //console.log(response);
        const data: signData = {
          isauthenticated: true,
          failed: false,
          success: true,
        };
        this.testData.next(data);
       // console.log(data);
        console.log(response);
        //this.router.navigate(['/signup/signupSuccessfully']);
      },
      (error) => {
        const data: signData = {
          isauthenticated: false,
          failed: true,
          success: false,
        };
        this.testData.next(data);
        console.log(error);
      }
    );
  }

  getAllVets(){

  }
  RequestAppointment(vet:string){
    this.http.post('http://localhost:3000/api/Appoint',vet).subscribe((response:any)=>{

    })

  }
  //////////////////////////////////////////////////////////////////////////////////////////////
  //Authentication Part
  getisAuth() {
    return this.isAuthenticated;
  }

  
}
