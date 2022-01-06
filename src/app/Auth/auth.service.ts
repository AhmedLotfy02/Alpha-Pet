

   
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { check } from 'express-validator';
import { Subject } from 'rxjs';
import { signData } from '../models/signUpData-model';
import {  OwnerAuthData, PharmacistAuthData, VetAuthData } from './auth-data-model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private testData = new Subject<signData>();

    private token!: string;
  private userEmail!: string;
  private Pharmacistuser1!: PharmacistAuthData;
  private Vetuser1!: VetAuthData;
  private Owneruser1!: OwnerAuthData;

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
  private loginListener = new Subject<boolean>();


  constructor(private http: HttpClient, private router: Router) {



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

    this.http.post('http://localhost:5000/pharmacists/signup', data).subscribe(
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
  getUser() {
    return this.Pharmacistuser1;
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();

    if (!authInformation) {
      return;
    }
    if(authInformation.type==='Vet'){
      this.http
      .post<{ message: string; user:VetAuthData }>(
        'http://localhost:5000/vets/getVetByEmail',
        { email: authInformation.email }
      )
      .subscribe((responsedata: any) => {
        this.Vetuser1 = responsedata.user;
        console.log(this.Vetuser1);

      });
    
    }
    else if(authInformation.token==='Pharmacist'){
      this.http
      .post<{ message: string; user: PharmacistAuthData }>(
        'http://localhost:5000/pharmacists/',
        { email: authInformation.email }
      )
      .subscribe((responsedata: any) => {
        this.Pharmacistuser1 = responsedata.user;
      });
    
    }
    else if(authInformation.token==='Owner'){
      this.http
      .post<{ message: string; user: OwnerAuthData }>(
        'http://localhost:5000/owners/',
        { email: authInformation.email }
      )
      .subscribe((responsedata: any) => {
        this.Pharmacistuser1 = responsedata.user;
      });
    
    }
    const now = new Date();
    const expiresIn = authInformation!.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      if (authInformation.email) {
        this.userEmail = authInformation.email;
      }
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duraion: number) {
    this.tokenTimer = setTimeout(() => {
     // this.logout();
    }, duraion * 1000);
  }
  private saveAuthData(token: string, expirtationDate: Date, email: string,type:string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirtationDate.toISOString());
    localStorage.setItem('email', email);
    localStorage.setItem('type', type);

  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('email');
    localStorage.removeItem('type');

  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    const email = localStorage.getItem('email');
    const type=  localStorage.getItem('type');
    if (!token || !expirationDate) {
      return;
    } else {
      return {
        token: token,
        expirationDate: new Date(expirationDate),
        email: email,
        type:type
      };
    }
  }
  
  getloginListener() {
    return this.loginListener.asObservable();
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  
  loginAsPharmacist(email:string,password:string){
    
    const authData1={
      email:email,
      password:password
    }
    console.log(authData1);
    this.http
      .post<{ token: string; expiresIn: number; user:PharmacistAuthData }>(
        'http://localhost:5000/pharmacists/signin',
        authData1
      )
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
           // const user1 = response.user;
           // this.user = user;
            // this.userEmail = email;
             
            console.log(response.user.Email);
            console.log(this.Pharmacistuser1);
            this.setAuthTimer(expiresInDuration);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, response.user.Email,'Pharmacist');
            this.router.navigate(['/Home']);
          }
        },
        (error) => {
          console.log(error);
          this.loginListener.next(true);
        }
      );
  }

  loginAsVet(email:string,password:string){
    const authData1={
      email:email,
      password:password
    }
    console.log(authData1);
    this.http
      .post<{ token: string; expiresIn: number; user:VetAuthData }>(
        'http://localhost:5000/vets/signin',
        authData1
      )
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
           // const user1 = response.user;
           // this.user = user;
            // this.userEmail = email;
             this.Vetuser1=response.user;
             console.log(this.Vetuser1);
            console.log(response.user.Email);
            
            this.setAuthTimer(expiresInDuration);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, response.user.Email,'Vet');
            this.router.navigate(['/Home']);
          }
        },
        (error) => {
          console.log(error);
          this.loginListener.next(true);
        }
      );
  }
}
