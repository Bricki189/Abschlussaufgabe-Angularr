import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FahrzeugComponent } from './pages/fahrzeug/fahrzeug.component';

const routes: Routes = [
  { path: '', component: FahrzeugComponent},
  { path: 'fahrzeug', component: FahrzeugComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
