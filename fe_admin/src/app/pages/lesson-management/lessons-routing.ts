
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LessonsComponent } from './lessons.component';

import { LessonListComponent } from './lessons/list.component';
import { LessonEditComponent } from './lessons/lesson-edit/lesson-edit.component';
import { CanDeactivateGuard } from 'src/app/containers/guards/can-deactivate/can-deactivate.guard';
// import { PendingChangesGuard } from 'src/app/containers/guards/deactivate/pending-changes.guard';

const routes: Routes = [
  {
    path: '',
    component: LessonsComponent,
    children: [

      {
        path: '',
        component: LessonListComponent,
      },
      {
        path: 'add',
        component: LessonEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'edit',
        component: LessonEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'edit/:id/:step',
        component: LessonEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      { path: '', redirectTo: 'Lessons', pathMatch: 'full' },
      { path: '**', redirectTo: 'Lessons', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonsRouting { }
