import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticalComponent } from './statistical.component';


const routes: Routes = [
  {
    path: '',
    component: StatisticalComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticalRoutingModule { }
