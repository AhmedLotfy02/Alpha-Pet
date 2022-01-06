import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { AuthGuard } from './Auth/auth.guard';
import { AccountComponent } from './views/account/account.component';
import { CreateComponent } from './views/Appointments/create/create.component';
import { HeaderComponent } from './views/components/header/header.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { SignUpAsOwnerComponent } from './views/signUp/sign-up-as-owner/sign-up-as-owner.component';
import { SignUpAsPharmacistComponent } from './views/signUp/sign-up-as-pharmacist/sign-up-as-pharmacist.component';
import { SignUpAsVetComponent } from './views/signUp/sign-up-as-vet/sign-up-as-vet.component';


const routes: Routes = [
 {path:'',component:LoginPageComponent},{path:'Home',component:HeaderComponent},{path:'Account',component:AccountComponent},{path:'Sign-UpAsOwner',component:SignUpAsOwnerComponent},{path:'Sign-UpAsPharmacist',component:SignUpAsPharmacistComponent}
,{path:'Sign-UpAsVet',component:SignUpAsVetComponent},{path:'Request-Appointment',component:CreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [//AuthGuard
  ],
})
export class AppRoutingModule {}
