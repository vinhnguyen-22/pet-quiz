import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendFBComponent } from './send-fb.component';
import { CanDeactivateGuard } from 'src/app/containers/guards/can-deactivate/can-deactivate.guard';
const routes: Routes = [
  {
    path: '',
    component: SendFBComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendFBRouting {}
