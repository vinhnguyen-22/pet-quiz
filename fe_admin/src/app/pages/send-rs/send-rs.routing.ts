import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/containers/guards/can-deactivate/can-deactivate.guard';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';
import { SendRSComponent } from './send-rs.component';
const routes: Routes = [
  {
    path: '',
    component: SendRSComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslationModule],
  exports: [RouterModule],
})
export class SendRSRouting { }
