import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KundeService } from '../../service/kunde.service';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Kunde } from '../../data/kunde';

@Component({
  selector: 'app-kunde',
  templateUrl: './kunde.component.html',
  styleUrl: './kunde.component.scss'
})
export class KundeComponent implements OnInit{

  kunde = new Kunde();
  public objForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    nachName: new UntypedFormControl(''),
    versicherungsNr: new UntypedFormControl(''),
  });

  constructor(private router: Router, private route: ActivatedRoute,
    private kundeService: KundeService, private formBuilder: UntypedFormBuilder, private snackBar: MatSnackBar) {
  }
  
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
      this.kundeService.getOne(id).subscribe(obj => {
        this.kunde = obj;
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.objForm = this.formBuilder.group(this.kunde);
    }
  }


  async save(formData: any) {
    this.kunde = Object.assign(formData);

    if (this.kunde.id) {
      this.kundeService.update(this.kunde).subscribe({
        next: () => {
          this.snackBar.open('', '', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('', '', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.kundeService.save(this.kunde).subscribe({
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
