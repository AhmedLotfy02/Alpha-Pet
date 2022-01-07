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

