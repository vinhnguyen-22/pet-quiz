import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';
import { PermissionComponent } from './permission.component';
const routes: Routes = [
  {
    path: '',
    component: PermissionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslationModule],
  exports: [RouterModule],
})
export class PermissionRouting { }
