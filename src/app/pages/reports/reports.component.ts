import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/services/cars.service';
import { REPORTS } from '../../interface/Reports';



@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public reportInf: REPORTS[] = [];
  public datosCar: any = [];
  constructor( private carService: CarsService,) { }

  ngOnInit(): void {
   
    this.carService.getCarsRent().subscribe(response => {
      console.log(response);
      this.reportInf = response;
    })
    
  }



}
