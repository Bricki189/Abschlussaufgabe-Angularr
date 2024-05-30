import { Component } from '@angular/core';
import { Schaden } from '../../data/schaden';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { SchadenService } from '../../service/schaden.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fahrzeug } from '../../data/fahrzeug';

@Component({
  selector: 'app-schaden-detail',
  templateUrl: './schaden-detail.component.html',
  styleUrl: './schaden-detail.component.scss'
})
export class SchadenDetailComponent {

  schaden = new Schaden();
  public objForm = new UntypedFormGroup({
    schadenArt: new UntypedFormControl(''),
    schadensstaerke: new UntypedFormControl(1),
    stelle: new UntypedFormControl(''),
    reperaturNotwendig: new UntypedFormControl(false),
    vonMieterVerursacht: new UntypedFormControl(false)

  });

  constructor(private router: Router, private route: ActivatedRoute,
    private schadenService: SchadenService, private formBuilder: UntypedFormBuilder, private snackBar: MatSnackBar) {
  }
  
  private fahrzeugId?: any;

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
      this.schadenService.getOne(id).subscribe(obj => {
        this.schaden = obj;
        this.objForm = this.formBuilder.group(obj);
      });
    } else if (this.route.snapshot.paramMap.get('fahrzeugId') !== null) {
      this.fahrzeugId = this.route.snapshot.paramMap.get('fahrzeugId');
      this.objForm = this.formBuilder.group(this.schaden);
    }
  }


  async save(formData: any) {
    this.schaden = Object.assign(formData);
    if (this.schaden.id) {
      this.schadenService.update(this.schaden).subscribe({
        next: () => {
          this.snackBar.open('', '', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('', '', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.schaden.fahrzeug = new Fahrzeug();
      this.schaden.fahrzeug.id = this.fahrzeugId;
      this.schadenService.save(this.schaden).subscribe({
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
