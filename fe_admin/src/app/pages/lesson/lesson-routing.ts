import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LessonComponent } from './lesson.component';


const routes: Routes = [
  {
    path: 'lesson/:id',
    component: LessonComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
