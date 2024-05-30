import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FahrzeugComponent } from './pages/fahrzeug/fahrzeug.component';
import { FahrzeugDetailComponent } from './pages/fahrzeug-detail/fahrzeug-detail.component';
import { SchadenDetailComponent } from './pages/schaden-detail/schaden-detail.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { ReservationDetailComponent } from './pages/reservation-detail/reservation-detail.component';


const routes: Routes = [
  { path: '', component: FahrzeugComponent},
  { path: 'fahrzeug', component: FahrzeugComponent },
  { path: 'fahrzeugdetail/:id', component: FahrzeugDetailComponent },
  { path: 'fahrzeugdetail', component: FahrzeugDetailComponent },
  { path: 'schadendetail/:id', component: SchadenDetailComponent },
  { path: 'schadendetail-new/:fahrzeugId', component: SchadenDetailComponent },
  { path: 'reservationen', component: ReservationComponent },
  { path: 'reservationdetail/:id', component: ReservationDetailComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
