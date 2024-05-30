import { Component, OnInit } from '@angular/core';
import { Schaden } from '../../data/schaden';
import { MatTableDataSource } from '@angular/material/table';
import { SchadenService } from '../../service/schaden.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-schaden-list',
  templateUrl: './schaden-list.component.html',
  styleUrl: './schaden-list.component.scss'
})
export class SchadenListComponent implements OnInit{

  displayedColumns: string[] = ['id', 'schadenArt', 'stelle', 'schadensstaerke', 'vonMieterVerursacht', 'buttons'];
  name : string = "";
  data : Schaden[] = []
  
  constructor(private schadenService: SchadenService, private route: ActivatedRoute,  private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog,){
  }


  fahrzeugId: number = 0;

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      this.fahrzeugId = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
      this.reloadData();
    } else {
    }
  }

  reloadData(){
    this.schadenService.getListByFahrzeug(this.fahrzeugId).subscribe(schaden => {
      this.data = schaden;
    });
  }

  async add() {
    await this.router.navigate(['schadendetail-new', this.fahrzeugId]);
  }

  async edit(e: Schaden) {
    await this.router.navigate(['schadendetail', e.id]);
  }

  delete(e: Schaden) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Löschen',
        message: 'Sind sie sich sicher das sie den Schaden löschen wollen?'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.schadenService.delete(e.id).subscribe({
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
