import { StringLiteralLike } from "typescript";

export interface PharmacistAuthData {
    Email: string;
    password: string;
    FName:string;
    LName:string;
    Pharmacy_Id:number;

    
  }


  export interface VetAuthData {
    EMAIL: string;
    password: string;
    FNAME:string;
    LNAME:string;
    CHARGE:number;
    STATE:boolean;
    
  }
  export interface OwnerAuthData {
    Email: string;
    password: string;
    FName:string;
    LName:string;
    phone:number;
    Balance:number;
    Favourite_Vet_Email:string,
    City:string;
    
  }
export interface PetAuthData{
  OwnerEmail:string,
  petName:String,
  color:string,
  age:number;
}

export interface InvoiceAuthData{
  InvoiceId:number;
  PharmacyID:number;
  Notes:string;
  RequiredMedicines:string;
  ownerEmail:string;
  Price:number;
  VetEmail:string;
  State:number;
}
export interface InvoiceAuthDataWhenPharmacist{

InvoiceId:number;
  PharmacyID:number;
  Notes:string;
  RequiredMedicines:string;
  ownerEmail:string;
  Price:number;
  VetEmail:string;
  State:number;
}

export interface MedAuthData{
  MedicineId:number;
  MedName:string;
  PharmacyID:number;
  MedDescription:string;
  Quantity:number;
  price:number;

}
export interface AppointmentAuthData{
  OwnerEmail:string;
  EndDate:string;
  StartDate:string;
  State:number;
  VetEmail:string;
  id:number;
  invoiceorNot:boolean;
}
export interface pharmacyAuthData{
  Address:string;
  EndDay:string;
  EndHour:string;
  Id:string;
  Phone:number;
  StartDay:string;
  StartHour:string;
}