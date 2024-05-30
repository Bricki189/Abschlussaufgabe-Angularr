import { Component } from '@angular/core';
import { Reservation } from '../../data/reservation';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ReservationService } from '../../service/reservation.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {
  constructor( private reservationService: ReservationService, private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router){
    this.reloadData();
  }

  displayedColumns: string[] = ['id', 'vonDatum', 'bisDatum', 'buttons'];
  name : string = "";
  data : Reservation[] = []

  reloadData(){
    this.reservationService.getListByKunde().subscribe(reservation => {
      this.data = reservation;
    });
  }

  async edit(e: Reservation) {
    await this.router.navigate(['reservationdetail', e.id]);
  }

  delete(e: Reservation) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Löschen',
        message: 'Sind sie sich sicher das sie die Reservation Löschen wollen?'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.reservationService.delete(e.id).subscribe({
          next: response => {
            if (response.status === 200) {
              this.snackBar.open('', '', {duration: 5000});
              this.reloadData();
            } else {
              this.snackBar.open('', '', {duration: 5000});
            }
          },
          error: () => this.snackBar.open('', '', {duration: 5000})
        });
      }
    });
  }
}

