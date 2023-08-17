import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./index.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: IndexComponent,
      },
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRouting {}
