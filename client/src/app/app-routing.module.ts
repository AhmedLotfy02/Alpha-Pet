import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';
import { AccountComponent } from './views/account/account.component';
import { CreateComponent } from './views/Appointments/create/create.component';
import { HeaderComponent } from './views/components/header/header.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { LoginAsOwnerComponent } from './views/login-pages/login-as-owner/login-as-owner.component';
import { LoginAsPharmacistComponent } from './views/login-pages/login-as-pharmacist/login-as-pharmacist.component';
import { LoginAsVetComponent } from './views/login-pages/login-as-vet/login-as-vet.component';
import { MainPageComponent } from './views/OwnerAccount/main-page/main-page.component';
import { MyFavVetComponent } from './views/OwnerAccount/my-fav-vet/my-fav-vet.component';
import { MyInformationComponent } from './views/OwnerAccount/my-information/my-information.component';
import { MyInvoicesComponent } from './views/OwnerAccount/my-invoices/my-invoices.component';
import { MyPetComponent } from './views/OwnerAccount/my-pet/my-pet.component';
import { AddMedicineComponent } from './views/PharmacistAccount/add-medicine/add-medicine.component';
import { PharmaMainPageComponent } from './views/PharmacistAccount/pharma-main-page/pharma-main-page.component';
import { PharmacistInfoComponent } from './views/PharmacistAccount/pharmacist-info/pharmacist-info.component';
import { SignUpAsOwnerComponent } from './views/signUp/sign-up-as-owner/sign-up-as-owner.component';
import { SignUpAsPharmacistComponent } from './views/signUp/sign-up-as-pharmacist/sign-up-as-pharmacist.component';
import { SignUpAsVetComponent } from './views/signUp/sign-up-as-vet/sign-up-as-vet.component';
import { MyInfoComponent } from './views/VetAccount/my-info/my-info.component';
import { VetMainPageComponent } from './views/VetAccount/vet-main-page/vet-main-page.component';


const routes: Routes = [
 {path:'',component:LoginPageComponent},{path:'Home',component:HeaderComponent},
 {path:'Account',component:MainPageComponent},
 {path:'Sign-UpAsOwner',component:SignUpAsOwnerComponent},{path:'Sign-UpAsPharmacist',component:SignUpAsPharmacistComponent}
,{path:'Sign-UpAsVet',component:SignUpAsVetComponent},
{path:'Request-Appointment',component:CreateComponent}
,{path:'Login-As-Pharmacist',component:LoginAsPharmacistComponent},
{path:'Login-As-Vet',component:LoginAsVetComponent},
{path:'Login-As-Owner',component:LoginAsOwnerComponent},
{path:'Account/MyPet',component:MyPetComponent},
{path:'Account/MyInformation',component:MyInformationComponent},
{path:'Account/MyFavVet',component:MyFavVetComponent},
{path:'Account/MyInvoices',component:MyInvoicesComponent},
{path:'MyAccount',component:PharmaMainPageComponent},
{path:'MyAccount/AddMedicine',component:AddMedicineComponent},
{path:'MyPanel',component:VetMainPageComponent},
{path:'MyPanel/MyInfo',component:MyInfoComponent},
{path:'MyAccount/MyInfo',component:PharmacistInfoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard
  ],
})
export class AppRoutingModule {}
