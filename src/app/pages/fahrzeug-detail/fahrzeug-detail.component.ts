import { Component, OnInit } from '@angular/core';
import { FahrzeugService } from '../../service/fahrzeug.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Fahrzeug } from '../../data/fahrzeug';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fahrzeug-detail',
  templateUrl: './fahrzeug-detail.component.html',
  styleUrl: './fahrzeug-detail.component.scss'
})
export class FahrzeugDetailComponent implements OnInit {

  fahrzeug = new Fahrzeug();
  public objForm = new UntypedFormGroup({
    marke: new UntypedFormControl(''),
    model: new UntypedFormControl(''),
    autoNr: new UntypedFormControl(''),
    rahmenNr: new UntypedFormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute,
    private fahrzeugService: FahrzeugService, private formBuilder: UntypedFormBuilder, private snackBar: MatSnackBar) {
  }
  
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
      this.fahrzeugService.getOne(id).subscribe(obj => {
        this.fahrzeug = obj;
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.objForm = this.formBuilder.group(this.fahrzeug);
    }
  }


  async save(formData: any) {
    this.fahrzeug = Object.assign(formData);

    if (this.fahrzeug.id) {
      this.fahrzeugService.update(this.fahrzeug).subscribe({
        next: () => {
          this.snackBar.open('', '', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('', '', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.fahrzeugService.save(this.fahrzeug).subscribe({
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
