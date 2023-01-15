import { Component, OnInit } from '@angular/core';
import { DataCarsRent } from '../interface/dataCarsRent';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-car-rent',
  templateUrl: './car-rent.component.html',
  styleUrls: ['./car-rent.component.scss']
})
export class CarRentComponent implements OnInit {
  public carsRent: DataCarsRent[] = [];
  public datosCar: any = [];
  constructor(
    private carService: CarsService,
  ) { }

  ngOnInit(){

    this.carService.getCarsRent().subscribe(response => {
      this.carsRent = response;
    })
  }

  public infoCard(info){
    this.datosCar = info;
  }

}
