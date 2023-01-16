import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { NewServiceComponent } from './new-service/new-service.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingButton } from '../directives/loading-button.directive';



@NgModule({
  declarations: [
    HomeComponent,
    ReportsComponent,
    NewServiceComponent,
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
