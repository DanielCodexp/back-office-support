import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarFreeComponent } from './car-free/car-free.component';
import { CarPlusComponent } from './car-plus/car-plus.component';
import { CarRentComponent } from './car-rent/car-rent.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RoutePath } from './phats/route-path.constant';

const routes: Routes = [
  {path: RoutePath.HOME_PATH, component: HomeComponent},
  {path: RoutePath.CAR_RENT_PATH, component: CarRentComponent},
  {path: RoutePath.CAR_FREE_PATH, component: CarFreeComponent},
  {path: RoutePath.CAR_PLUS_PATH, component: CarPlusComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
