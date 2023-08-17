import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';
import { RequestSupportComponent } from './request-support.component';
const routes: Routes = [
  {
    path: '',
    component: RequestSupportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslationModule],
  exports: [RouterModule],
})
export class RequestSupportRouting { }
