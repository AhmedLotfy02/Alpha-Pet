

   
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { check } from 'express-validator';
import { Subject } from 'rxjs';
import { signData } from '../models/signUpData-model';
import {  InvoiceAuthData, MedAuthData, OwnerAuthData, PetAuthData, PharmacistAuthData, VetAuthData } from './auth-data-model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private testData = new Subject<signData>();
  
    private token!: string;
  private userEmail!: string;
  private Pharmacistuser1!: PharmacistAuthData;
  private Vetuser1!: VetAuthData;
  private Owneruser1!: OwnerAuthData;
  private Pet!: PetAuthData;
  private Invoices!:InvoiceAuthData[];
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
  private OwnerEmailListener=new Subject<OwnerAuthData>();
  private PharmacistUserListener=new Subject<PharmacistAuthData>();
  private PetListener = new Subject<PetAuthData>();
  private PetFoundListener= new Subject<boolean>();
  private changepassListener = new Subject<{
    changed: boolean;
    failed: boolean;
  }>();
  private VetsListener=new Subject<VetAuthData[]>();
  private VetUserListener=new Subject<VetAuthData>();
  private MedicinesListener=new Subject<MedAuthData[]>();
  private medicines!:MedAuthData[];
  getMedicinesListener(){
    return this.MedicinesListener.asObservable();
  }
  constructor(private http: HttpClient, private router: Router) {
    }
   
    getCurrentOwner(){
      return this.OwnerEmailListener.asObservable();
    }
    getCurrentPharmacist(){
      return this.PharmacistUserListener.asObservable();
    }
    getChangePassListener() {
      return this.changepassListener.asObservable();
    }
    getPetOfOwner(){
      return this.PetListener.asObservable();
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
  getVetsListener(){
    return this.VetsListener.asObservable();
  }

  getAllVets(){
    this.http.get<{vetArray:VetAuthData[]}>('http://localhost:5000/vets/').subscribe((response:any)=>{
    this.VetsListener.next(response);
    console.log(response);
    })
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
    if(authInformation.type==='vet'){
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
    else if(authInformation.type==='pharmacist'){
      this.http
      .post<{ message: string; user: PharmacistAuthData }>(
        'http://localhost:5000/pharmacists/getPharmacistByEmail',
        { email: authInformation.email }
      )
      .subscribe((responsedata: any) => {
        this.Pharmacistuser1 = responsedata.user;
        console.log(this.Pharmacistuser1);
      });
    
    }
    else if(authInformation.type==='owner'){
      this.http
      .post<{ message: string; user: OwnerAuthData }>(
        'http://localhost:5000/owners/getOwnerByEmail',
        { email: authInformation.email }
      )
      .subscribe((responsedata: any) => {
        this.Owneruser1 = responsedata.user;
        this.OwnerEmailListener.next(responsedata.user);
        console.log(this.Owneruser1);
      });
      this.http.get<{pet:PetAuthData}>(`http://localhost:5000/pets/owner/${this.Owneruser1.Email}`).
      subscribe((response)=>{
        this.PetListener.next(response.pet);
        this.Pet=response.pet;
        console.log(this.Pet);
        this.PetFoundListener.next(true);
      },(error)=>{
        this.PetFoundListener.next(false);
        console.log(error);
      })
      this.getInvoicesOfOwner();
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

  RequestInformationsofUser(){
    const authInformation = this.getAuthData();

    if (!authInformation) {
      return;
    }
    this.http
    .post<{ message: string; user: OwnerAuthData }>(
      'http://localhost:5000/owners/getOwnerByEmail',
      { email: authInformation.email }
    )
    .subscribe((responsedata: any) => {
      this.Owneruser1 = responsedata.user;
      this.OwnerEmailListener.next(responsedata.user);
      console.log(this.Owneruser1);
    });
    this.http.get<{pet:PetAuthData}>(`http://localhost:5000/pets/owner/${authInformation.email}`).
    subscribe((response)=>{
      this.PetListener.next(response.pet);
      this.Pet=response.pet;
      console.log(this.Pet);
      console.log(response);
      if(this.Pet===undefined){
        this.PetFoundListener.next(false);
        return;
      }
      this.PetFoundListener.next(true);
    },(error)=>{
      this.PetFoundListener.next(false);
      console.log(error);
    })
    this.http.get<{data:InvoiceAuthData[]}>(`http://localhost:5000/invoices/owner/${authInformation.email}`).subscribe((response)=>{
      this.InvoicesListener.next(response.data); 
    this.Invoices=response.data;

    },(error)=>{
      console.log(error);
    })
  }

  RequestInformationsofPharmacistUser(){
    const authInformation = this.getAuthData();

    if (!authInformation) {
      return;
    }
    this.http
    .post<{ message: string; user: PharmacistAuthData }>(
      'http://localhost:5000/pharmacists/getPharmacistByEmail',
      { email: authInformation.email }
    )
    .subscribe((responsedata: any) => {
      this.PharmacistUserListener.next(responsedata.user);
      this.Pharmacistuser1 = responsedata.user;
      console.log(this.Pharmacistuser1);
    });
    
    this.http.get<{data:InvoiceAuthData[]}>('http://localhost:5000/invoices/').subscribe((response)=>{
      this.InvoicesListener.next(response.data); 
    this.Invoices=response.data;

    },(error)=>{
      console.log(error);
    })
     console.log(authInformation.pharmacyID);
    this.http.get<{data:MedAuthData[]}>(`http://localhost:5000/medicines/pharmacyMedicines/${authInformation.pharmacyID}`).subscribe((response)=>{
      this.MedicinesListener.next(response.data);
        this.medicines=response.data;
    console.log(response);

    },(error)=>{
      console.log(error);
    })
  
  }

  getVetUserListener(){
    return this.VetUserListener.asObservable();
  }
  RequestInformationsofVetUser(){
    const authInformation = this.getAuthData();

    if (!authInformation) {
      return;
    }
    this.http
    .post<{ message: string; user: VetAuthData }>(
      'http://localhost:5000/vets/getVetByEmail',
      { email: authInformation.email }
    )
    .subscribe((responsedata: any) => {
      this.VetUserListener.next(responsedata.user);
      this.Vetuser1 = responsedata.user;
      console.log(this.Vetuser1);
    });
    
    
  }



  private setAuthTimer(duraion: number) {
    this.tokenTimer = setTimeout(() => {
     // this.logout();
    }, duraion * 1000);
  }
  private saveAuthData(token: string, expirtationDate: Date, email: string,type:string,pharmacy_id:number) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirtationDate.toISOString());
    localStorage.setItem('email', email);

    localStorage.setItem('type', type);
    if(type==='pharmacist'){
      localStorage.setItem('pharmacyID', pharmacy_id.toString());
    }
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
    const pharmacyID=  localStorage.getItem('pharmacyID');

    if(type==='pharmacist'){
      if (!token || !expirationDate) {
        return;
      } else {
        return {
          token: token,
          expirationDate: new Date(expirationDate),
          email: email,
          type:type,
          pharmacyID:pharmacyID
        };
      }
    }
    else{
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
    
  }
  getPetFoundListener(){
    return this.PetFoundListener.asObservable();
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
            this.saveAuthData(token, expirationDate, response.user.Email,'pharmacist',response.user.Pharmacy_Id);
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
            console.log(response.user.EMAIL);
            
            this.setAuthTimer(expiresInDuration);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, response.user.EMAIL,'vet',0);
            this.router.navigate(['/Home']);
          }
        },
        (error) => {
          console.log(error);
          this.loginListener.next(true);
        }
      );
  }
  loginAsOwner(email:string,password:string){
    const authData1={
      email:email,
      password:password
    }
    console.log(authData1);
    this.http
      .post<{ token: string; expiresIn: number; user:OwnerAuthData }>(
        'http://localhost:5000/owners/signin',
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
             this.Owneruser1=response.user;
             console.log(this.Owneruser1);
            console.log(response.user.Email);
            
            this.setAuthTimer(expiresInDuration);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, response.user.Email,'owner',0);
            this.router.navigate(['/Home']);
          }
        },
        (error) => {
          console.log(error);
          this.loginListener.next(true);
        }
      );
  }

  changePasswordofOwner(password: string, currentpass: string) {
    console.log(password);
    console.log(this.Owneruser1);
    if(currentpass!=this.Owneruser1.password){
      this.changepassListener.next({ changed: false, failed: true });

    return;
    
    }
    const data = {
      newpassword: password,
      currentpass: currentpass,
      email: this.Owneruser1.Email,
    };
    this.http
      .post<{ message: string; user: OwnerAuthData }>(
        'http://localhost:5000/owners/updatePassofOwner',
        data
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.changepassListener.next({ changed: true, failed: false });
          this.Owneruser1 = response.user;
        },
        (error) => {
          this.changepassListener.next({ changed: false, failed: true });

          console.log(error);
        }
      );
  }
  logout() {
    this.token = '';
    this.authStatusListener.next(false);
    this.isAuthenticated = false;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }
  private FavVetListener=new Subject<boolean>();  
  getFavVetListener(){
    return this.FavVetListener.asObservable();
  }
  FavVet(OwnerEmail:string,VetEmail:string){
    this.Owneruser1.Favourite_Vet_Email=VetEmail;
    console.log(this.Owneruser1);
    //const data={...this.Owneruser1,Favourite_Vet_Email:VetEmail};
    this.http.patch('http://localhost:5000/owners/update',this.Owneruser1).subscribe((response)=>{
      console.log('FavEmail done updated');
      this.FavVetListener.next(true);
    },(error)=>{
      this.Owneruser1.Favourite_Vet_Email='none@gmail.com';

      console.log(error);
      this.FavVetListener.next(false);
    })
  }

  private PetsListener=new Subject<PetAuthData[]>();  
  getPetsListener(){
    return this.PetsListener.asObservable();
  }
  getAllPets(){
    this.http.get<{PetArray:PetAuthData[]}>('http://localhost:5000/pets/').subscribe((response:any)=>{
      this.PetListener.next(response);
    })
  }
  
  changePet(petname:string,petAge:number,petColor:string){
    const data={
      petName:petname,
      color:petColor
      ,age:petAge,
      currentUserEmail:this.Owneruser1.Email
    }
    this.http.patch('http://localhost:5000/pets/',data).subscribe((response:any)=>{
      this.Pet=response;
      console.log(response);
    },(error)=>{
      console.log(error)
    })
  }


  
  AddPet(petname:string,petAge:number,petColor:string){
    const data={
      petName:petname,
      color:petColor
      ,age:petAge,
      currentUserEmail:this.Owneruser1.Email
    }
    this.http.post('http://localhost:5000/pets/createPet',data).subscribe((response:any)=>{
      this.Pet=response;
      console.log(response);
    },(error)=>{
      console.log(error)
    })
  }

  private InvoicesListener=new Subject<InvoiceAuthData[]>();  
  getInvoicesListener(){
    return this.InvoicesListener.asObservable();
  }
  
  getInvoicesOfOwner(){
    this.http.get<{data:InvoiceAuthData[]}>(`http://localhost:5000/invoices/owner/${this.Owneruser1.Email}`).subscribe((response)=>{
    this.InvoicesListener.next(response.data);  
    this.Invoices=response.data;
      console.log(response);
    },(error)=>{
      console.log(error);
    })
  }
  private medicineListener=new Subject<boolean>();
  getmedicineListener(){
    return this.medicineListener.asObservable();
  }
  AddMedicine(name:string,price:number,quantity:number,description:string,pharmacyID:number,medID:number){

    const data={
      currentUserEmail:this.Pharmacistuser1.Email,
      medicineId:medID,
      medicineName:name,
      description:description,
      price:price,
      pharmacyId:pharmacyID,
      quantity:quantity
    }
    console.log(data);
    this.http.post('http://localhost:5000/medicines/',data).subscribe((response)=>{
      this.medicineListener.next(true);
    console.log(response);
    },(error)=>{
      this.medicineListener.next(false);
      console.log(error);
    })

  }
  
  getAllMedicinesOfPharmacy(){
   
  }

  //pharmacy opinion
  acceptInvoice(invoice:InvoiceAuthData){
    const data={
      invoiceId:invoice.InvoiceId,
      state:2,
      
    }
    this.http.patch('http://localhost:5000/invoices/check',data).subscribe((response)=>{
      console.log(response);
    })
  }
  refuseInvoice(invoice:InvoiceAuthData){
    const data={
      invoiceId:invoice.InvoiceId,
      state:3,
      
    }
    this.http.patch('http://localhost:5000/invoices/check',data).subscribe((response)=>{
      console.log(response);
    })
  }

}
