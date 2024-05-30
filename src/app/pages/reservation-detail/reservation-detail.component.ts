import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../service/reservation.service';
import { Reservation } from '../../data/reservation';


@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrl: './reservation-detail.component.scss'
})
export class ReservationDetailComponent implements OnInit{

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
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
      this.reservationService.getOne(id).subscribe(obj => {
        this.reservation = obj;
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.objForm = this.formBuilder.group(this.reservation);
    }
  }


  async save(formData: any) {
    this.reservation = Object.assign(formData);
    if (this.reservation.id) {
      this.reservationService.update(this.reservation).subscribe({
        next: () => {
          this.snackBar.open('', '', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('', '', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
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
  }

  async back() {
    await this.router.navigate(['fahrzeug']);
  }
}
