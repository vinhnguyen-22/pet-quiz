
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameListComponent } from './games/list.component';
import { GameUpdateComponent } from './games/game-update/game-update.component';
import { GameComponent } from './games.component';
import { CanDeactivateGuard } from 'src/app/containers/guards/can-deactivate/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: GameComponent,
    children: [

      {
        path: '',
        component: GameListComponent,
      },
      {
        path: 'add',
        component: GameUpdateComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'edit',
        component: GameUpdateComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'edit/:id',
        component: GameUpdateComponent,
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
export class GamesRouting { }
