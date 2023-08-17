
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/containers/guards/can-deactivate/can-deactivate.guard';
import { TopicsComponent } from './topics.component';
import { TopicListComponent } from './topics/list.component';
import { TopicEditEvaluationFormComponent } from './topics/topic-edit-evaluation-form/topic-edit-evaluation-form.component';
import { TopicEditComponent } from './topics/topic-edit/topic-edit.component';

const routes: Routes = [
  {
    path: '',
    component: TopicsComponent,
    children: [

      {
        path: '',
        component: TopicListComponent,
      },
      {
        path: 'add',
        component: TopicEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'edit',
        component: TopicEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'edit/:id',
        component: TopicEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'evaluationForm/add',
        component: TopicEditEvaluationFormComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'evaluationForm/edit',
        component: TopicEditEvaluationFormComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'evaluationForm/edit/:id',
        component: TopicEditEvaluationFormComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      { path: '', redirectTo: 'topics', pathMatch: 'full' },
      { path: '**', redirectTo: 'topics', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicsRouting { }
