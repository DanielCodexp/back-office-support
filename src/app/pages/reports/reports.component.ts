import { Component, OnInit } from '@angular/core';
import { DataCarsRent } from 'src/app/interface/dataCarsRent';
import { CarsService } from 'src/app/services/cars.service';



@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public carsRent: DataCarsRent[] = [];
  public datosCar: any = [];
  constructor( private carService: CarsService,) { }

  ngOnInit(): void {
   
    this.carService.getCarsRent().subscribe(response => {
      console.log(this.carsRent);
      this.carsRent = response;
    })
    
  }



}
