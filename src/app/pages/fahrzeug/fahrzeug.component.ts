import { Component } from '@angular/core';
import { Fahrzeug } from '../../data/fahrzeug';
import { FahrzeugService } from '../../service/fahrzeug.service';
import { MatDialog } from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fahrzeug',
  templateUrl: './fahrzeug.component.html',
  styleUrl: './fahrzeug.component.scss'
})
export class FahrzeugComponent {

  constructor( private fahrzeugService: FahrzeugService, private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router){
    this.reloadData();
  }

  displayedColumns: string[] = ['id', 'marke', 'model', 'autoNr', 'rahmenNr', 'buttons'];
  name : string = "";
  data : Fahrzeug[] = []

  reloadData(){
    this.fahrzeugService.getList().subscribe(fahrzeug => {
      this.data = fahrzeug;
    });
  }

  async edit(e: Fahrzeug) {
    await this.router.navigate(['fahrzeugdetail', e.id]);
  }

  async add() {
    await this.router.navigate(['fahrzeugdetail']);
  }

  delete(e: Fahrzeug) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Löschen',
        message: 'Sind sie sich sicher das sie das Fahrzeug ' + e.marke + ' ' + e.model + ' Löschen wollen?'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.fahrzeugService.delete(e.id).subscribe({
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
