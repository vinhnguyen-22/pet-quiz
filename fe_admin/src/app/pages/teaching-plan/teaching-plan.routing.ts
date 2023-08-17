import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';
import { TeachingPlanComponent } from './teaching-plan.component';

const routes: Routes = [
  {
    path: '',
    component: TeachingPlanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslationModule],
  exports: [RouterModule],
})
export class TeachingPlanRouting { }
