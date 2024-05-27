import { Component } from '@angular/core';
import { Fahrzeug } from '../../data/fahrzeug';
import { FahrzeugService } from '../../service/fahrzeug.service';

@Component({
  selector: 'app-fahrzeug',
  templateUrl: './fahrzeug.component.html',
  styleUrl: './fahrzeug.component.scss'
})
export class FahrzeugComponent {

  constructor( private fahrzeugService: FahrzeugService){
    this.reloadData();
  }

  displayedColumns: string[] = ['id', 'marke', 'model', 'autoNr', 'rahmenNr'];
  name : string = "";
  data : Fahrzeug[] = []

  reloadData(){
    this.fahrzeugService.getList().subscribe(fahrzeug => {
      this.data = fahrzeug;
    });
  }
}
