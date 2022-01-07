import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { HeaderComponent } from './views/components/header/header.component';
import { AccountComponent } from './views/account/account.component';
import { SignUpAsOwnerComponent } from './views/signUp/sign-up-as-owner/sign-up-as-owner.component';
import { SignUpAsVetComponent } from './views/signUp/sign-up-as-vet/sign-up-as-vet.component';
import { SignUpAsPharmacistComponent } from './views/signUp/sign-up-as-pharmacist/sign-up-as-pharmacist.component';
import { AuthInterceptor } from './Auth/auth-interceptor';
import { CreateComponent } from './views/Appointments/create/create.component';
import { LoginAsPharmacistComponent } from './views/login-pages/login-as-pharmacist/login-as-pharmacist.component';
import { LoginAsVetComponent } from './views/login-pages/login-as-vet/login-as-vet.component';
import { LoginAsOwnerComponent } from './views/login-pages/login-as-owner/login-as-owner.component';
import { MainPageComponent } from './views/OwnerAccount/main-page/main-page.component';
import { MyPetComponent } from './views/OwnerAccount/my-pet/my-pet.component';
import { MyInformationComponent } from './views/OwnerAccount/my-information/my-information.component';
import { MyFavVetComponent } from './views/OwnerAccount/my-fav-vet/my-fav-vet.component';
import { VetMainPageComponent } from './views/VetAccount/vet-main-page/vet-main-page.component';
import { AppointmetsComponent } from './views/VetAccount/appointmets/appointmets.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HeaderComponent,
    AccountComponent,
    SignUpAsOwnerComponent,
    SignUpAsVetComponent,
    SignUpAsPharmacistComponent,
    CreateComponent,
    LoginAsPharmacistComponent,
    LoginAsVetComponent,
    LoginAsOwnerComponent,
    MainPageComponent,
    MyPetComponent,
    MyInformationComponent,
    MyFavVetComponent,
    VetMainPageComponent,
    AppointmetsComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSidenavModule,
    MatIconModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
  providers: [
   {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
