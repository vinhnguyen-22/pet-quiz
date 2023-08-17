import { PagingModule } from './../../modules/paging/paging.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmptyTableModule } from 'src/app/modules/empty-table/empty-table.module';
import { StudentListComponent } from './students/list.component';
import { StudentComponent } from './student.component';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { StudentCreateComponent } from './students/structure-create/student-create.component';
import { StudentsRouting } from './student-routing';

@NgModule({
  declarations: [StudentCreateComponent, StudentListComponent, StudentComponent],
  imports: [
    CommonModule,
    PagingModule,
    EmptyTableModule,
    StudentsRouting,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    InlineSVGModule,
    TranslationModule,
  ],
})
export class StudentModule {}
