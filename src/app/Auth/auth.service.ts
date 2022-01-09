

   
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { check } from 'express-validator';
import { report } from 'process';
import { Subject } from 'rxjs';
import { signData } from '../models/signUpData-model';
import {  AppointmentAuthData, InvoiceAuthData, MedAuthData, OwnerAuthData, PetAuthData, PharmacistAuthData, pharmacyAuthData, VetAuthData } from './auth-data-model';

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
private homeUserListener=new Subject<{ownerPage:boolean,VetPage:boolean,PharmacistPage:boolean}>();
getHomeUserListener(){
  return this.homeUserListener.asObservable();
}
ownerPage=false;
vetPage=false;
pharmacistpage=false;

private appointmentsofVet!:AppointmentAuthData[];
private AppointmentsofVetListener=new Subject<AppointmentAuthData[]>();
getAppointmentsofVetListener(){
  return this.AppointmentsofVetListener.asObservable();
}
getAuthStatusListener() {
  return this.authStatusListener.asObservable();
}

getownerPage(){
  return this.ownerPage;
}

getvetPage(){
  return this.vetPage;
}

getPharmacPage(){
  return this.pharmacistpage;
}

  constructor(private http: HttpClient, private router: Router) {
    }
   
    getCurrentOwner(){
      return this.OwnerEmailListener.asObservable();
    }
    getCurrentPharmacist(){
      return this.PharmacistUserListener.asObservable();
    }
    getCurrentVetListener(){

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
        this.router.navigate(['/Login-As-Owner']);

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
        this.router.navigate(['/Login-As-Pharmacist']);

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
        this.router.navigate(['/Login-As-Vet']);

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
  getTestData() {
    return this.testData.asObservable();
  }
  private ErrorSignUpListener=new Subject<boolean>();
  getErrorSignUpListener(){
    return this.ErrorSignUpListener.asObservable();
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
  private AppointAddedListener=new Subject<{doneadding:boolean,notadded:boolean}>();
  getAppointAddedListener(){
    return this.AppointAddedListener.asObservable();
  }
  RequestAppointment(vetEmail:string,FullDate:string,EndDate:string){
    const data={
      currentUserEmail:this.Owneruser1.Email,
      vetEmail:vetEmail,
      startDate:FullDate,
      endDate:EndDate,
      state:1
    }
    
    this.http.post('http://localhost:5000/appointments/',data).subscribe((response:any)=>{
      this.AppointAddedListener.next({doneadding:true,notadded:false});
    },(error)=>{
      console.log(error);
      this.AppointAddedListener.next({doneadding:false,notadded:true});

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

    this.authStatusListener.next(true);
    
    if(authInformation.type==='vet'){
      this.http
      .post<{ message: string; user:VetAuthData }>(
        'http://localhost:5000/vets/getVetByEmail',
        { email: authInformation.email }
      )
      .subscribe((responsedata: any) => {
        this.Vetuser1 = responsedata.user;
        //console.log(this.Vetuser1);

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
      this.http.get<{pet:PetAuthData}>(`http://localhost:5000/pets/owner/${authInformation.email}`).
      subscribe((response)=>{
        this.PetListener.next(response.pet);
        this.Pet=response.pet;
        console.log(this.Pet);
        if(this.Pet===undefined){
          this.PetFoundListener.next(true);

        }
        else{
          this.PetFoundListener.next(false);

        }
      },(error)=>{
        this.PetFoundListener.next(false);
        console.log(error);
      })
      this.http.get<{data:InvoiceAuthData[]}>(`http://localhost:5000/invoices/owner/${authInformation.email}`).subscribe((response)=>{
    this.InvoicesListener.next(response.data);  
    this.Invoices=response.data;
      console.log(response);
    },(error)=>{
      console.log(error);
    })
    }
    const now = new Date();
    const expiresIn = authInformation!.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      if (authInformation.email) {
        if(authInformation.type==='vet'){
          this.Vetuser1.EMAIL = authInformation.email;

        }
        if(authInformation.type==='pharmacist'){
          this.Pharmacistuser1.Email = authInformation.email;

        }
        if(authInformation.type==='owner'){
          this.Owneruser1.Email = authInformation.email;

        }
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
       
        this.PetFoundListener.next(true);
        return;
      }else{
        this.Pet.found=true;
        this.PetFoundListener.next(false);

      }
      console.log(this.Pet);
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

    this.http.get<{data:AppointmentAuthData[]}>(`http://localhost:5000/appointments/owner/${authInformation.email}`).subscribe((response)=>{
      this.appointsofownerListener.next(response.data);
      this.appointsofowner=response.data;
    console.log(response);
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
    this.http.get<{data:AppointmentAuthData[]}>(`http://localhost:5000/appointments/vet/${authInformation.email}`).subscribe((response)=>{
      this.AppointmentsofVetListener.next(response.data);
      this.appointmentsofVet=response.data;
    console.log(response);
    },(error)=>{
      console.log(error);
    })
    this.http.get<{data:pharmacyAuthData[]}>('http://localhost:5000/pharmacy').subscribe((response)=>{
      console.log(response);
      this.pharamices=response.data;
      this.PharmaciesListener.next(response.data);
    })
    
  }



  private setAuthTimer(duraion: number) {
    this.tokenTimer = setTimeout(() => {
     this.logout();
    }, duraion * 1000);
  }
  private saveAuthData(token: string, expirtationDate: Date, email: string,type:string,pharmacy_id:number,Fname:string,LName:string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirtationDate.toISOString());
    localStorage.setItem('email', email);
    localStorage.setItem('fName', Fname);
    localStorage.setItem('lName', LName);

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
            this.pharmacistpage=true;
            this.vetPage=false;
            this.ownerPage=false;
              console.log('isauth'+this.isAuthenticated);
            this.homeUserListener.next({ownerPage:false,VetPage:false,PharmacistPage:true});
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
            this.saveAuthData(token, expirationDate, response.user.Email,'pharmacist',response.user.Pharmacy_Id,response.user.FName,response.user.LName);
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
            this.pharmacistpage=false;
            this.vetPage=true;
            this.ownerPage=false;
            this.homeUserListener.next({ownerPage:false,VetPage:true,PharmacistPage:false});

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
            this.saveAuthData(token, expirationDate, response.user.EMAIL,'vet',0,response.user.FNAME,response.user.LNAME);
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
            this.pharmacistpage=false;
            this.vetPage=false;
            this.ownerPage=true;
            this.homeUserListener.next({ownerPage:true,VetPage:false,PharmacistPage:false});

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
            this.saveAuthData(token, expirationDate, response.user.Email,'owner',0,response.user.FName,response.user.LName);
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

  changePasswordofVet(password: string, currentpass: string) {
    console.log(password);
    console.log(this.Vetuser1);
    
    const data = {
      newpassword: password,
      currentpass: currentpass,
      email: this.Vetuser1.EMAIL,
    };
    this.http
      .post<{ message: string; user: VetAuthData }>(
        'http://localhost:5000/vets/updatePassofVet',
        data
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.changepassListener.next({ changed: true, failed: false });
          this.Vetuser1 = response.user;
        },
        (error) => {
          this.changepassListener.next({ changed: false, failed: true });

          console.log(error);
        }
      );
  }

  changePasswordofPharmacist(password: string, currentpass: string) {
    console.log(password);

    
    const data = {
      newpassword: password,
      currentpass: currentpass,
      email: this.Pharmacistuser1.Email,
    };
    this.http
      .patch<{ message: string; user: PharmacistAuthData }>(
        'http://localhost:5000/pharmacists/update',
        data
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.changepassListener.next({ changed: true, failed: false });
          this.Pharmacistuser1 = response.user;
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
  login(){
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
  
  private PetEditedListener=new Subject<boolean>();
  getPetEditedListener(){
    return this.PetEditedListener.asObservable();
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
      this.PetEditedListener.next(true);
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
    this.http.post('http://localhost:5000/pets/',data).subscribe((response:any)=>{
      this.Pet=response;
      this.PetFoundListener.next(false);
      this.PetEditedListener.next(true);

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

  private invoiceEditedListener=new Subject<boolean>();
  getinvoiceEditedListener(){
    return this.invoiceEditedListener.asObservable();
  }
  //pharmacy opinion
  acceptInvoice(invoice:InvoiceAuthData){
    const data={
      invoiceId:invoice.InvoiceId,
      state:2,
      
    }
    this.http.patch('http://localhost:5000/invoices/check',data).subscribe((response)=>{
      console.log(response);
      this.invoiceEditedListener.next(true);
    })
  }
  refuseInvoice(invoice:InvoiceAuthData){
    const data={
      invoiceId:invoice.InvoiceId,
      state:3,
      
    }
    this.http.patch('http://localhost:5000/invoices/check',data).subscribe((response)=>{
      this.invoiceEditedListener.next(true);

      console.log(response);
    })
  }


  getAppointmentsOfVet(){
       this.http.get(`http://localhost:5000/appointments/vet/${this.Vetuser1.EMAIL}`).subscribe((response)=>{
         console.log(response);
       })
  }
  acceptAppoint(appoint:AppointmentAuthData){
    const data={
      Id:appoint.id,
      ownerEmail:appoint.OwnerEmail,
      state:2,
      startDate:appoint.StartDate,
      currentUserEmail:appoint.VetEmail
    }
    this.http.post('http://localhost:5000/appointments/updateStateOfAppointment',data).subscribe((response)=>{
      console.log(response);
      this.ChoiceAppointListener.next(true);

    })
    this.router.navigate(['/MyPanel']);
  }
  rejectAppoint(appoint:AppointmentAuthData){
    const data={
      Id:appoint.id,
      ownerEmail:appoint.OwnerEmail,
      state:3,
      startDate:appoint.StartDate,
      currentUserEmail:appoint.VetEmail
    }
    this.http.post('http://localhost:5000/appointments/updateStateOfAppointment',data).subscribe((response)=>{
      console.log(response);
      this.ChoiceAppointListener.next(true);
    })
    this.router.navigate(['/MyPanel']);

  }
  CompleteAppoint(appoint:AppointmentAuthData){
    const data={
      Id:appoint.id,
      ownerEmail:appoint.OwnerEmail,
      state:4,
      startDate:appoint.StartDate,
      currentUserEmail:appoint.VetEmail
    }
    this.http.post('http://localhost:5000/appointments/updateStateOfAppointment',data).subscribe((response)=>{
      console.log(response);
      this.ChoiceAppointListener.next(true);
    })
    this.router.navigate(['/MyPanel']);

  }
  NeedSugery(appoint:AppointmentAuthData){
    const data={
      Id:appoint.id,
      ownerEmail:appoint.OwnerEmail,
      state:5,
      startDate:appoint.StartDate,
      currentUserEmail:appoint.VetEmail
    }
    this.http.post('http://localhost:5000/appointments/updateStateOfAppointment',data).subscribe((response)=>{
      console.log(response);
      this.ChoiceAppointListener.next(true);
    })
    this.router.navigate(['/MyPanel']);
  }
  AddInvoice(notes:string,appoint:AppointmentAuthData,price:number,reqMed:string,pharID:number){
      const data={
        pharmacyId:pharID,
        notes:notes,
        requiredMedicines:reqMed,
        ownerEmail:appoint.OwnerEmail,
        price:price,
        currentUserEmail:appoint.VetEmail,
        state:1
      }

      this.http.post('http://localhost:5000/invoices/',data).subscribe((res)=>{
        console.log(res);
      },(error)=>{
        console.log(error);
      })

      const data1={
        Id:appoint.id,
        ownerEmail:appoint.OwnerEmail,
        state:6,
        startDate:appoint.StartDate,
        currentUserEmail:appoint.VetEmail
      }
      this.http.post('http://localhost:5000/appointments/updateStateOfAppointment',data1).subscribe((response)=>{
        console.log(response);
        this.ChoiceAppointListener.next(true);
      })


  }
  private pharamices!:pharmacyAuthData[];
  private PharmaciesListener=new Subject<pharmacyAuthData[]>();
  getPharmaciesListener(){
    return this.PharmaciesListener.asObservable();
  }
  getAllPharmacies(){
      this.http.get<{data:pharmacyAuthData[]}>('http://localhost:5000/pharmacy').subscribe((response)=>{
        console.log(response);
        this.pharamices=response.data;
        this.PharmaciesListener.next(response.data);
      })
  }

  private ChoiceAppointListener=new Subject<boolean>();
  getChoiceAppoint(){
    return this.ChoiceAppointListener.asObservable();
  }
  private appointsofowner!:AppointmentAuthData[];
  private appointsofownerListener=new Subject<AppointmentAuthData[]>();
  getappoinstofownerListener(){
    return this.appointsofownerListener.asObservable();
  }
  private deleteAppointbyOwnerListener=new Subject<boolean>();
  getdeleteAppointbyOwnerListener(){
    return this.deleteAppointbyOwnerListener.asObservable();
  }
  deleteAppointmentbyOwner(appoint:AppointmentAuthData){
    const data={
      ownerEmail:appoint.OwnerEmail,
      vetEmail:appoint.VetEmail,
      startDate:appoint.StartDate,
      currentUserEmail:appoint.OwnerEmail
    }
    this.http.patch('http://localhost:5000/appointments/delete',data).subscribe((response)=>{
    console.log(response);
    this.deleteAppointbyOwnerListener.next(true);
    })
  }
  gotoAccount(){
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    if(authInformation.type==="vet"){
      this.router.navigate(['/MyPanel']);
    }
    else if(authInformation.type==="pharmacist"){
      this.router.navigate(['/MyAccount']);
    }
    else if(authInformation.type==="owner"){
      this.router.navigate(['/Account']);
    }


    // if(this.ownerPage){
    //   this.router.navigate(['/Account']);
    // }
    // else if(this.VetPage){
    //   this.router.navigate(['/MyPanel']);
    //   console.log('vvett');
    // }
    // else if(this.PharmacistPage){
    //   this.router.navigate(['/MyAccount']);
    // }
  }

  

}
