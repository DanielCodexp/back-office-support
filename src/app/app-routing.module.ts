import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoutePath } from './phats/route-path.constant';
import { ReportsComponent } from './pages/reports/reports.component';
import { NewServiceComponent } from './pages/new-service/new-service.component';
const routes: Routes = [
  {path: RoutePath.HOME_PATH, component: HomeComponent},
  {path: RoutePath.REPORTS_PATH, component: ReportsComponent},
  {path:RoutePath.NEW_SERVICE_PATH, component: NewServiceComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
