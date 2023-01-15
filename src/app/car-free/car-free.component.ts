import { Component, OnInit } from '@angular/core';
import { DatosCars } from '../interface/cars-interface';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-car-free',
  templateUrl: './car-free.component.html',
  styleUrls: ['./car-free.component.scss']
})
export class CarFreeComponent implements OnInit {
  public cars: DatosCars[] = [];

  constructor(
    private carService: CarsService
  ) { }

  ngOnInit(){
    this.carService.getCars().subscribe(
      (response) => {

      function filtrarPorStatus(obj) {
        if ('available' in obj && obj.available === true) {
          return true;
        } 
      }
     var responseFilter = response.filter(filtrarPorStatus);
     this.cars = responseFilter;
    })
  }

}
