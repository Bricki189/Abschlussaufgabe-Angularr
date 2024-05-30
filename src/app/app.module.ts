import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthConfig, OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { AppAuthService } from './service/app.auth.service';
import { HttpXSRFInterceptor } from './interceptor/http.csrf.interceptor';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { FahrzeugComponent } from './pages/fahrzeug/fahrzeug.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {MatTableModule} from '@angular/material/table';
import { FahrzeugDetailComponent } from './pages/fahrzeug-detail/fahrzeug-detail.component';
import {MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatFormField, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { SchadenListComponent } from './components/schaden-list/schaden-list.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SchadenDetailComponent } from './pages/schaden-detail/schaden-detail.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { KundeComponent } from './pages/kunde/kunde.component';
import { ReservationDetailComponent } from './pages/reservation-detail/reservation-detail.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {IsInRoleDirective} from './dir/is.in.role.dir';
import {IsInRolesDirective} from './dir/is.in.roles.dir';
import { HomePageComponent } from './pages/home-page/home-page.component';


export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/ILV',
  requireHttps: false,
  redirectUri: 'http://localhost:4200',
  postLogoutRedirectUri: 'http://localhost:4200',
  clientId: 'AbsschlussaufgabeClient',
  scope: 'openid profile roles offline_access',
  responseType: 'code',
  showDebugInformation: true,
  requestAccessToken: true,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  silentRefreshTimeout: 500,
  clearHashAfterLogin: true,
};

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

@NgModule({
  declarations: [
    AppComponent,
    FahrzeugComponent,
    NavBarComponent,
    FahrzeugDetailComponent,
    ConfirmDialogComponent,
    SchadenListComponent,
    SchadenDetailComponent,
    ReservationComponent,
    KundeComponent,
    ReservationDetailComponent,
    IsInRoleDirective,
    IsInRolesDirective,
    HomePageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    OAuthModule.forRoot({resourceServer: {sendAccessToken: true}}),
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    MatDialogModule,
    MatHint,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule


  ],
  providers: [
    provideAnimationsAsync(),
    {provide: AuthConfig, useValue: authConfig},
    {provide: HTTP_INTERCEPTORS, useClass: HttpXSRFInterceptor, multi: true},
    {
      provide: OAuthStorage, useFactory: storageFactory
    },
    Location, {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(authService: AppAuthService) {
    authService.initAuth().finally();
  }
 }
