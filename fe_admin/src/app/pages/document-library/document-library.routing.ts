import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentAddComponent } from './document-add/document-add.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentLibraryComponent } from './document-library.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentLibraryComponent,
    children: [
      {
        path: 'lesson/add',
        component: DocumentAddComponent,
      },
      {
        path: 'game/add',
        component: DocumentAddComponent,
      },
      {
        path: 'lesson',
        component: DocumentListComponent,
      },
      {
        path: 'game',
        component: DocumentListComponent,
      },
      { path: '', redirectTo: 'document-library', pathMatch: 'full' },
      { path: '**', redirectTo: 'document-library', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentLibraryRouting {}
