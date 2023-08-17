import { ParentsComponent } from './parents/parents.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './student-management.component';
import { StudentsListComponent } from './students/list.component';
import { StudentStoreComponent } from './student-store/list.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    children: [
      {
        path: 'students',
        component: StudentsListComponent,
      }, {
        path: 'student-store',
        component: StudentStoreComponent,
      },
      {
        path: 'parents',
        component: ParentsComponent,
      },

      { path: '', redirectTo: 'students', pathMatch: 'full' },
      { path: '**', redirectTo: 'students', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRouting { }
