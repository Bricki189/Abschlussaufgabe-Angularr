import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Reservation } from '../../data/reservation';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../service/reservation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fahrzeug } from '../../data/fahrzeug';
import { Kunde } from '../../data/kunde';

@Component({
  selector: 'app-reservation-trigger',
  templateUrl: './reservation-trigger.component.html',
  styleUrl: './reservation-trigger.component.scss'
})
export class ReservationTriggerComponent implements OnInit {

  private fahrzeugId: any;
  reservation = new Reservation();
  public objForm = new UntypedFormGroup({
    vonDatum: new UntypedFormControl(Date),
    bisDatum: new UntypedFormControl(Date),
  });

  constructor(private router: Router, private route: ActivatedRoute,
    private reservationService: ReservationService, private formBuilder: UntypedFormBuilder, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      this.fahrzeugId = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
    } 
  }

  async save(formData: any) {
    this.reservation = Object.assign(formData);
    this.reservation.fahrzeug = new Fahrzeug();
    this.reservation.fahrzeug.id = this.fahrzeugId;
    this.reservation.kunde = new Kunde();
    
    this.reservationService.save(this.reservation).subscribe({
      next: () => {
        this.snackBar.open('', '', {duration: 5000});
        this.back();
      },
      error: () => {
        this.snackBar.open('', '', {duration: 5000, politeness: 'assertive'});
      }
    });
  }
  

  async back() {
    await this.router.navigate(['reservationen']);
  }

}
