import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FahrzeugComponent } from './pages/fahrzeug/fahrzeug.component';
import { FahrzeugDetailComponent } from './pages/fahrzeug-detail/fahrzeug-detail.component';
import { SchadenDetailComponent } from './pages/schaden-detail/schaden-detail.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { ReservationDetailComponent } from './pages/reservation-detail/reservation-detail.component';
import { KundeComponent } from './pages/kunde/kunde.component';
import {appCanActivate} from './guard/app.auth.guard';
import { AppRoles } from '../app.roles';
import { HomePageComponent } from './pages/home-page/home-page.component';


const routes: Routes = [
  { path: '', component: HomePageComponent},
  
  { path: 'fahrzeug', component: FahrzeugComponent, canActivate: [appCanActivate], data: {roles: [AppRoles.Admin, AppRoles.Mitartbeiter, AppRoles.User]}},
  { path: 'fahrzeugdetail/:id', canActivate: [appCanActivate], component: FahrzeugDetailComponent, data: {roles: [AppRoles.Admin, AppRoles.User, AppRoles.Mitartbeiter]} },
  { path: 'fahrzeugdetail', canActivate: [appCanActivate], component: FahrzeugDetailComponent , data: {roles: [AppRoles.Admin, AppRoles.Mitartbeiter]}},
  { path: 'schadendetail/:id', canActivate: [appCanActivate], component: SchadenDetailComponent, data: {roles: [AppRoles.Admin, AppRoles.Mitartbeiter, AppRoles.User]} },
  { path: 'schadendetail-new/:fahrzeugId', canActivate: [appCanActivate], component: SchadenDetailComponent, data: {roles: [AppRoles.Admin, AppRoles.Mitartbeiter]} },
  { path: 'reservationen', canActivate: [appCanActivate], component: ReservationComponent, data: {roles: [AppRoles.Admin, AppRoles.Mitartbeiter, AppRoles.User]} },
  { path: 'reservationdetail/:id', canActivate: [appCanActivate], component: ReservationDetailComponent, data: {roles: [AppRoles.Admin, AppRoles.Mitartbeiter, AppRoles.User]} },
  { path: 'profile', canActivate: [appCanActivate], component: KundeComponent, data: {roles: [AppRoles.Admin, AppRoles.Mitartbeiter, AppRoles.User]} },
  { path: 'noaccess', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
