
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/containers/guards/can-deactivate/can-deactivate.guard';
import { StudentComponent } from './student.component';

import { StudentListComponent } from './students/list.component';
import { StudentCreateComponent } from './students/structure-create/student-create.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [

      {
        path: '',
        component: StudentListComponent,
      },
      {
        path: 'add',
        component: StudentCreateComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      { path: '', redirectTo: 'Students', pathMatch: 'full' },
      { path: '**', redirectTo: 'Students', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRouting { }
