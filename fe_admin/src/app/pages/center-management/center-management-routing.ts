import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolsComponent } from './center-management.component';
import { SchoolListComponent } from './schools/list.component';
import { SchoolImplementComponent } from './schools/school-implement/school-edit.component';
import { SchoolEditComponent } from './schools/school-edit/school-edit.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';
import { ClassesEditComponent } from './classes/classes-edit/classes-edit.component';
import { CanDeactivateGuard } from 'src/app/containers/guards/can-deactivate/can-deactivate.guard';
import { TeacherListComponent } from './teachers/list.component';
import { TeacherEditComponent } from './teachers/teacher-edit/teacher-edit.component';
import { AddStudentComponent } from './add-student/add-student.component';

import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolsComponent,
    children: [
      {
        path: 'schools',
        component: SchoolListComponent,
      },
      {
        path: 'teachers',
        component: TeacherListComponent,
      },
      {
        path: 'teachers/add',
        component: TeacherEditComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'teachers/edit',
        component: TeacherEditComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'teachers/edit/:id',
        component: TeacherEditComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'classes/student-edit/:id',
        component: StudentEditComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'classes/student-detail/:id',
        component: StudentDetailComponent,
      },
      {
        path: 'classes',
        component: ClassesComponent,
      },
      {
        path: 'classes/detail/:id',
        component: ClassDetailComponent,
      },
      {
        path: 'classes/add',
        component: ClassesEditComponent,
        canActivate: [],
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'classes/edit',
        component: ClassesEditComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'classes/edit/:id',
        component: ClassesEditComponent,
        canActivate: [],
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'classes/add-student/:id',
        component: AddStudentComponent,
        canActivate: [],
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'schools/edit/:id',
        component: SchoolEditComponent,
      },
      {
        path: 'schools/add',
        component: SchoolEditComponent,
      },
      {
        path: 'schools/implement/:id',
        component: SchoolImplementComponent,
      },
      {
        path: 'students/detail/:id',
        component: StudentDetailComponent,
      },

      { path: '', redirectTo: 'center-management/classes', pathMatch: 'full' },
      { path: '**', redirectTo: 'center-management/classes', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolRouting {}
